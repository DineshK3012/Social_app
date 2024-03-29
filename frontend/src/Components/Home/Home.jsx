import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowingPosts, getAllUsers } from '../../Actions/User'
import Loader from '../Loader/Loader'
import User from '../User/User'
import Post from '../Post/Post'
import './Home.css'
import { Typography } from '@mui/material'

import { toast } from 'react-toastify'

const Home = () => {
    const { loading, posts, error } = useSelector(state => state.postOfFollowing)

    const { loading: usersLoading, users } = useSelector(state => state.allUsers);

    const { error: likeError, message } = useSelector(state => state.like);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFollowingPosts());
        dispatch(getAllUsers());
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

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' })
        }
    }, [error, likeError, message, dispatch])

    return (
        loading === true || usersLoading === true
            ?
            <Loader /> : (
                <div className="home">
                    <div className="homeleft">
                        {
                            posts && posts.length > 0 ?
                                (posts.map((post) => {
                                    return <Post key={post._id}
                                        postId={post._id}
                                        postImage={post.image.url}
                                        caption={post.caption}
                                        likes={post.likes}
                                        comments={post.comments}

                                        ownerId={post.owner}
                                        ownerName={post.owner.name}
                                        ownerImage={post.owner.avatar.url}
                                    />
                                })
                                ) :
                                <Typography variant="h6">No posts yet</Typography>
                        }
                    </div>
                    <div className="homeright">
                        {
                            users && users.length > 0 ?
                                (
                                    users.map((user) => (
                                        <User key={user._id}
                                            userId={user._id}
                                            name={user.name}
                                            avatar={user.avatar.url}
                                        />
                                    ))
                                ) : <Typography variant="h6">No users</Typography>
                        }
                    </div>
                </div >
            )
    );
};

export default Home