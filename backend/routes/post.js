const express = require('express');
const { createPost, deletePost, likeAndUnlikePost, getPostsOfFollowing, updatePost, commentOnPost, deleteComment } = require('../controllers/post');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// localhost:4000/api/v1/post/upload
router.route('/post/upload').post(isAuthenticated, createPost);
router.route('/post/:id')
    .get(isAuthenticated, likeAndUnlikePost)
    .put(isAuthenticated, updatePost)
    .delete(isAuthenticated, deletePost)

router.route('/posts').get(isAuthenticated, getPostsOfFollowing)
router.route('/post/comment/:id')
    .put(isAuthenticated, commentOnPost)
    .delete(isAuthenticated, deleteComment)

module.exports = router;