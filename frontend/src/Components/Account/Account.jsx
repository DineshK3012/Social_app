import React, { useEffect, useState } from 'react'
import './Account.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserProfile, getMyPosts, logoutUser } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User/User'

import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Avatar, Button, Dialog, Typography } from '@mui/material'

const Account = () => {
    const dispatch = useDispatch();
    const { error, posts, loading } = useSelector(state => state.myPosts)
    const { error: likeError, message } = useSelector(state => state.like);
    const { user, loading: userLoading, error: userError, message: userMessage } = useSelector(state => state.user)

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);

    const handleLogout = async () => {
        await dispatch(logoutUser())
        toast.success("Logged out successfully")
    }

    const handleProfileDelete = () => {
        dispatch(deleteUserProfile());
    }

    useEffect(() => {
        dispatch(getMyPosts());

    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearErrors' })
        }

        if (likeError) {
            toast.error(likeError);
            dispatch({ type: 'clearErrors' })
        }

        if (userError) {
            toast.error(userError);
            dispatch({ type: 'clearErrors' })
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' })
        }

        if (userMessage) {
            toast.success(userMessage);
            dispatch({ type: 'clearMessage' })
        }
    }, [error, likeError, userError, message, userMessage, dispatch])

    return (
        loading || userLoading ? <Loader /> : (
            <div className='account'>
                <div className="accountleft">
                    {
                        posts && posts.length > 0 ?
                            (
                                posts.map(post => {
                                    return <Post key={post._id}
                                        postId={post._id}
                                        postImage={post.image.url}
                                        caption={post.caption}
                                        likes={post.likes}
                                        comments={post.comments}

                                        ownerId={post.owner._id}
                                        ownerName={post.owner.name}
                                        ownerImage={post.owner.avatar.url}
                                        isAccount={true}
                                        isDelete={true}
                                    />
                                })
                            ) :
                            <Typography variant='h6'>No Posts Yet</Typography>
                    }
                </div>
                <div className="accountright">
                    <Avatar
                        src={user.avatar.url}
                        sx={{ height: "8vmax", width: "8vmax" }}
                    />
                    <Typography variant='h5'>{user.name}</Typography>

                    <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                            <Typography>
                                Followers
                            </Typography>
                        </button>
                        <Typography>{user.followers.length}</Typography>
                    </div>
                    <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                            <Typography>
                                Following
                            </Typography>
                        </button>
                        <Typography>{user.following.length}</Typography>
                    </div>

                    <div>
                        <Typography>Posts</Typography>
                        <Typography>{user.posts.length}</Typography>
                    </div>

                    <Button variant='contained' onClick={handleLogout}>
                        Logout
                    </Button>

                    <Link to="/update/profile">Edit Profile</Link>
                    <Link to="/update/password">Change Password</Link>

                    <Button
                        variant='text'
                        style={{ color: "red", margin: "2vmax" }}
                        onClick={handleProfileDelete}
                        disabled={userLoading}
                    >
                        Delete My Profile
                    </Button>

                    <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                        <Typography variant='h4'>Followers</Typography>

                        <div className="DialogBox">
                            {
                                user && user.followers.length > 0 ?
                                    user.followers.map((follower) => {
                                        return <User
                                            key={follower._id}
                                            userId={follower._id}
                                            name={follower.name}
                                            avatar={follower.avatar.url}
                                        />
                                    }) :
                                    <Typography>No Followers yet</Typography>
                            }
                        </div>
                    </Dialog>

                    <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                        <Typography variant='h4'>Followings</Typography>

                        <div className="DialogBox">
                            {
                                user && user.following.length > 0 ?
                                    user.following.map((following) => {
                                        return <User
                                            key={following._id}
                                            userId={following._id}
                                            name={following.name}
                                            avatar={following.avatar.url}
                                        />
                                    }) :
                                    <Typography>No Followings yet</Typography>
                            }
                        </div>
                    </Dialog>
                </div>
            </div>
        )
    )
}

export default Account