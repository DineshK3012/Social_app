import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../Actions/User'
import { toast } from 'react-toastify'

import './UpdatePassword.css'

const UpdatePassword = () => {
    const { loading, error, message } = useSelector(state => state.user)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updatePassword(oldPassword, newPassword));
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
        <div className="updatePassword">
            <form className="updatePasswordForm" onSubmit={handleSubmit}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Password</Typography>

                <input className='updatePasswordInputs' type="password" placeholder='Old Password' value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }} required />

                <input className='updatePasswordInputs' type="password" placeholder='New Password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} required />

                <Button disabled={loading} type='submit'>Change Password</Button>
            </form>
        </div>
    )
}

export default UpdatePassword