import React, { useEffect, useState } from 'react'
import { Typography, Button, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../Actions/User'
import { toast } from "react-toastify"

import './Register.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);

    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();

        dispatch(registerUser(avatar, name, email, password));
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        }
    }

    const { loading, error, message } = useSelector(state => state.user);

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
        <div className='register'>
            <form className="registerForm" onSubmit={handleRegister}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>


                <Avatar
                    src={avatar}
                    alt="user"
                    sx={{ height: "10vmax", width: "10vmax" }}
                />

                <input type='file' accept='image/*' onChange={handleAvatarChange} required />

                <input className='registerInputs' type='text' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required />

                <input className='registerInputs' type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />

                <input className='registerInputs' type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                <Button disabled={loading} type='submit'>Register</Button>

                <Link to="/">
                    <Typography>Already Signed Up? Login Now</Typography>
                </Link>
            </form>
        </div>
    )
}

export default Register