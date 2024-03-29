import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../Actions/User'
import { toast } from 'react-toastify'

import './ForgotPassword.css'

const ForgotPassword = () => {
    const { loading, message, error } = useSelector(state => state.user);

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(forgotPassword(email));
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
        <div className="forgotPassword">
            <form className="forgotPasswordForm" onSubmit={handleSubmit}>
                <Typography variant="h4" style={{ padding: "2vmax" }}>Forgot Password</Typography>

                <input type="email" className='forgotPasswordInputs' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />

                <Button disabled={loading} type='submit'>Send Token</Button>
            </form>
        </div>
    )
}

export default ForgotPassword