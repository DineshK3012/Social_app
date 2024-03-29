import React, { useEffect, useState } from 'react'
import { Typography, Button, Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile, loadUser } from '../../Actions/User'
import { toast } from "react-toastify"

import './UpdateProfile.css'

const UpdateProfile = () => {
    const { loading, error, user, message } = useSelector(state => state.user);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

    const dispatch = useDispatch();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPrev(Reader.result);
                setAvatar(Reader.result);
            }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        await dispatch(updateUserProfile(avatar, name, email));
        dispatch(loadUser());
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }

        if (message) {
            toast.success(message);
            dispatch({
                type: "clearMessage"
            })
        }
    }, [dispatch, error, message])

    return (
        <div className='updateProfile'>
            <form className="updateProfileForm" onSubmit={handleUpdate}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Profile</Typography>

                <Avatar
                    src={avatarPrev}
                    alt="user"
                    sx={{ height: "10vmax", width: "10vmax" }}
                />

                <input type='file' accept='image/*' onChange={handleAvatarChange} required />

                <input className='updateProfileInputs' type='text' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required />

                <input className='updateProfileInputs' type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />

                <Button disabled={loading} type='submit'>Update</Button>
            </form>
        </div>
    )
}

export default UpdateProfile