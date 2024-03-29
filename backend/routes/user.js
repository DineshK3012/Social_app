const express = require('express');
const router = express.Router();
const { register, login, logout, updatePassword, updateProfile, followUser, deleteMyProfile, myProfile, getMyPosts, getUserPosts, getUserProfile, getAllUsers, forgotPassword, resetPassword } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated, logout);
router.route('/update/password').put(isAuthenticated, updatePassword);
router.route('/update/profile').put(isAuthenticated, updateProfile);
router.route('/delete/me').delete(isAuthenticated, deleteMyProfile);
router.route('/me').get(isAuthenticated, myProfile);
router.route('/user/:id').get(isAuthenticated, getUserProfile);
router.route('/users').get(isAuthenticated, getAllUsers);
router.route('/follow/:id').get(isAuthenticated, followUser);
router.route('/forgot/password').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/my/posts').get(isAuthenticated, getMyPosts);
router.route('/userposts/:id').get(isAuthenticated, getUserPosts);

module.exports = router;