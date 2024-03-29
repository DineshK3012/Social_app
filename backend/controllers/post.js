const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary")

exports.createPost = async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "posts"
        })

        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            owner: req.user._id
        }

        const post = await Post.create(newPostData);

        //adding the created post to the user's posts array
        const user = await User.findById(req.user._id);
        user.posts.unshift(post._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Post created"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //post not found
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        //check if the user is the owner of the post
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this post"
            });
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id);

        await Post.deleteOne({ _id: req.params.id });

        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if the post is not found
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        //check if the user is the owner of the post
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this post"
            })
        }

        post.caption = req.body.caption;
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if (!req.body.comment) {
            return res.status(400).json({
                success: false,
                message: "Please add a comment first"
            })
        }

        let ind = -1;
        post.comments.forEach((comment, index) => {
            if (comment.user.toString() === req.user._id.toString()) {
                ind = index;
            }
        })

        if (ind !== -1) {
            post.comments[ind].comment = req.body.comment;

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment updated successfully"
            })

        } else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            });

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment added successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.owner.toString() === req.user._id.toString()) {
            //user is the owner of the post, so he can delete any comment
            if (!req.body.commentId) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide commentId"
                });
            }

            post.comments.forEach((comment, index) => {
                if (comment._id.toString() == req.body.commentId) {
                    return post.comments.splice(index, 1);
                }
            })

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Selected comment has deleted successfully"
            })

        } else {
            //user can only delete his own comment
            post.comments.forEach((comment, index) => {
                if (comment.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1);
                }
            })

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Your comment has deleted successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.likeAndUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //post not found
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);

            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post unliked"
            });
        } else {
            post.likes.push(req.user._id);
            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post liked"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getPostsOfFollowing = async (req, res) => {
    try {
        // Method 1: Using populate
        // const user = await User.findById(req.user._id).populate("following", "posts");

        //Method 2 (More efficient)
        const user = await User.findById(req.user._id);
        const posts = await Post.find({
            owner: { $in: user.following }
        }).populate("owner likes comments.user");

        res.status(200).json({
            success: true,
            posts: posts.reverse()
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}