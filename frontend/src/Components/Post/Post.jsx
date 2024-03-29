import React, { useEffect, useState } from 'react'
import './Post.css'
import { Avatar, Button, Typography, Dialog } from '@mui/material'
import { Link } from 'react-router-dom'
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, addCommentOnPost, updatePost, deletePost } from '../../Actions/Post'
import { getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User'
import User from '../User/User'
import CommentCard from '../CommentCard/CommentCard'

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false
}) => {
    const [liked, setLiked] = useState(false);
    const [showLikes, setShowLikes] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [CommentToggle, setCommentToggle] = useState(false);

    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const handleLike = async () => {
        setLiked(!liked)

        // calling api to like the post
        await dispatch(likePost(postId));
        if (isAccount)
            dispatch(getMyPosts());
        else
            dispatch(getFollowingPosts());
    }

    const handleAddComment = async (e) => {
        e.preventDefault();

        await dispatch(addCommentOnPost(postId, commentValue));
        setCommentValue('');

        if (isAccount)
            dispatch(getMyPosts());
        else
            dispatch(getFollowingPosts());
    }

    const handleUpdateCaption = async (e) => {
        e.preventDefault();

        await dispatch(updatePost(postId, captionValue))
        dispatch(getMyPosts());
    }

    const handleDeletePost = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser())
    }

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true);
            }
        })
    }, [likes, user._id])

    return (
        <div className='post'>
            <div className="postHeader">
                {
                    isAccount
                    &&
                    <Button onClick={() => setCaptionToggle(!captionToggle)}>
                        <MoreVert />
                    </Button>
                }
            </div>
            <img src={postImage} alt='post' />

            <div className="postDetails">
                <Avatar src={ownerImage} alt={ownerName} sx={
                    {
                        height: "3vmax",
                        width: "3vmax"
                    }} />

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>

                <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {caption}
                </Typography>
            </div>

            <button
                style={{
                    backgroundColor: "white",
                    border: "none",
                    cursor: "pointer",
                    margin: "1vmax 2vmax"
                }}
                onClick={() => setShowLikes(!showLikes)}
                disabled={likes.length === 0}
            >
                <Typography>{likes.length} Likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
                </Button>

                <Button onClick={() => setCommentToggle(!CommentToggle)}>
                    <ChatBubbleOutline />
                </Button>

                {isDelete
                    &&
                    <Button onClick={handleDeletePost}>
                        <DeleteOutline />
                    </Button>
                }
            </div>

            <Dialog open={showLikes} onClose={() => setShowLikes(!showLikes)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>
                    {
                        likes.map(user => (
                            <User
                                key={user._id}
                                userId={user._id}
                                name={user.name}
                                avatar={user.avatar.url}
                            />
                        ))
                    }
                </div>
            </Dialog>

            <Dialog
                open={CommentToggle}
                onClose={() => setCommentToggle(!CommentToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>
                    <form
                        className="commentForm"
                        onSubmit={handleAddComment}
                    >
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Add a comment"
                        />

                        <Button type="submit" variant='contained'>
                            Add
                        </Button>
                    </form>
                    {
                        comments.length === 0
                            ? <Typography variant="h6" style={{ "textAlign": "Center" }}>No Comments</Typography>
                            :
                            comments.map(item => (
                                <CommentCard
                                    key={item._id}
                                    userId={item.user._id}
                                    name={item.user.name}
                                    avatar={item.user.avatar.url}
                                    comment={item.comment}
                                    commentId={item._id}
                                    postId={postId}
                                    isAccount={isAccount}
                                />
                            ))
                    }
                </div>
            </Dialog>

            <Dialog
                open={captionToggle}
                onClose={() => setCaptionToggle(!captionToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Update Post Captino</Typography>
                    <form
                        className="commentForm"
                        onSubmit={handleUpdateCaption}
                    >
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder="Caption Here..."
                        />

                        <Button type="submit" variant='contained'>
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div >
    )
}

export default Post