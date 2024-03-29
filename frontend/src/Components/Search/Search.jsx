import React, { useState } from 'react'
import { Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import Loader from '../Loader/Loader';
import User from '../User/User'
import './Search.css'

const Search = () => {
    const { loading: usersLoading, users } = useSelector(state => state.allUsers);

    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(getAllUsers(name));
    }

    return (
        <div className='search'>
            <form className="searchForm" onSubmit={handleSubmit}>
                <Typography variant="h4" style={{ padding: "2vmax" }}>Search User</Typography>

                <input type='text' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required />

                <Button disabled={usersLoading} type='submit'>Search</Button>

                <div className="searchResults">
                    {
                        usersLoading ? <Loader />
                            :
                            (
                                (users && users.length) > 0 ?
                                    (
                                        users.map((user) => (
                                            <User key={user._id}
                                                userId={user._id}
                                                name={user.name}
                                                avatar={user.avatar.url}
                                            />
                                        ))
                                    ) : <Typography variant="h6">No user found</Typography>
                            )
                    }
                </div>
            </form>
        </div>
    )
}

export default Search