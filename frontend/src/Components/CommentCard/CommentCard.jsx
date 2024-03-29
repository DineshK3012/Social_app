import React from 'react'
import "./CommentCard.css"
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCommentOnPost } from '../../Actions/Post'
import { getFollowingPosts, getMyPosts } from '../../Actions/User'

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount = false
}) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleDeleteComment = async () => {
        await dispatch(deleteCommentOnPost(postId, commentId));

        if (isAccount)
            dispatch(getMyPosts());
        else
            dispatch(getFollowingPosts());
    }

    return (
        <div className='commentUser'>
            <Link to={`/user/${userId}`} alt={name}>
                <img src={avatar} alt={name} />
                <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
            </Link>

            <Typography style={{ "margin": "5px 10px" }}>
                {comment}
            </Typography>
            {
                (isAccount || userId === user._id) && (
                    <Button onClick={handleDeleteComment}>
                        <Delete />
                    </Button>
                )
            }

        </div >
    )
}

export default CommentCard