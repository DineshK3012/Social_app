import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, getUserPosts, followAndUnfollowUser } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User/User'

import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import '../Account/Account.css'

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user: me } = useSelector(state => state.user)

    const { user, loading: userLoading, error: userError, message: userMessage } = useSelector(state => state.userProfile)
    const { error, posts, loading } = useSelector(state => state.userPosts)

    const { error: likeError, message } = useSelector(state => state.like);

    const params = useParams();

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const handleFollow = async () => {
        setFollowing(!following)

        await dispatch(followAndUnfollowUser(user._id));
        dispatch(getUserProfile(params.id));
    }

    useEffect(() => {
        dispatch(getUserProfile(params.id));
        dispatch(getUserPosts(params.id));

    }, [dispatch, params.id])

    useEffect(() => {
        if (me._id === params.id)
            setMyProfile(true);

        if (user) {
            user.followers.forEach(follower => {
                if (follower._id === me._id) {
                    setFollowing(true);
                }
            });
        }
    }, [params.id, me._id, user])

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
                                    />
                                })
                            ) :
                            <Typography variant='h6'>No Posts Yet</Typography>
                    }
                </div>
                <div className="accountright">
                    {
                        user
                        &&
                        (
                            <>
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

                                {
                                    !myProfile
                                    &&
                                    <Button variant='contained'
                                        style={{ background: following ? "red" : "blue" }}
                                        onClick={handleFollow}
                                    >
                                        {
                                            following ? "Unfollow" : "Follow"
                                        }
                                    </Button>
                                }

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
                            </>
                        )
                    }
                </div>
            </div >
        )
    )
}

export default UserProfile