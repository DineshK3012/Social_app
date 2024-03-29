import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Actions/User'
import { toast } from 'react-toastify'

import "./Login.css";

const Login = () => {
    const { loading, message, error } = useSelector(state => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginHandler = (e) => {
        e.preventDefault();

        dispatch(loginUser(email, password));
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
        <div className="login">
            <form className="loginForm" onSubmit={loginHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Login</Typography>

                <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                <Link to="/forgot/password">
                    <Typography>Forgot Password</Typography>
                </Link>

                <Button disabled={loading} type='submit'>Login</Button>

                <Link to="/register">
                    <Typography>New User? Register from here</Typography>
                </Link>
            </form>
        </div>
    )
}

export default Login