import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../Actions/User'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import './ResetPassword.css'

const ResetPassword = () => {
    const { loading, message, error } = useSelector(state => state.user);

    const [password, setPassword] = useState("");
    const params = useParams();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(resetPassword(params.token, password));
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
        <div className="resetPassword">
            <form className="resetPasswordForm" onSubmit={handleSubmit}>
                <Typography variant="h4" style={{ padding: "2vmax" }}>Reset Password</Typography>

                <input type="password" className='resetPasswordInputs' placeholder='New Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                <Button disabled={loading} type='submit'>Reset</Button>

                <Link to="/forgot/password">
                    <Typography>
                        Request Another Token!
                    </Typography>
                </Link>

                <Typography>Or</Typography>

                <Link to="/login">
                    <Typography>
                        Login Now
                    </Typography>
                </Link>
            </form>
        </div>
    )
}

export default ResetPassword