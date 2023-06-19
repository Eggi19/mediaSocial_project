import * as React from 'react';
import { useEffect, useState } from "react";
import Navbar from "../../Component/navbar";
import Avatar from '@mui/material/Avatar';
import { editProfile, getUser } from "../../API/userAPI";
import { Button, Container, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
    const [userData, setUserData] = useState({})
    const [edit, setEdit] = useState(false)
    const _profilePicture = React.useRef()
    const _fullName = React.useRef()
    const _bio = React.useRef()
    const _username = React.useRef()

    const getUserData = async () => {
        try {
            const userId = localStorage.getItem('id')
            const dataUser = await getUser(userId)
            setUserData(dataUser?.data?.data)
        } catch (error) {

        }
    }

    const handleEdit = () => {
        if (edit) {
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    const handleSubmit = async () => {
        try {
            const profilePicture = _profilePicture.current.files[0]
            const fullName = _fullName.current.value
            const bio = _bio.current.value
            const username = _username.current.value
            const userId = localStorage.getItem('id')

            const result = await editProfile({ profilePicture, fullName, bio, username, userId })
            console.log(result.data.message);
            if (result.data?.status) {
                handleEdit()
                getUserData()
                toast.success('Edit Success')
            } else {
                const errorMessage = { message: result.data?.message }
                throw errorMessage
            }
        } catch (error) {
            handleEdit()
            getUserData()
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Navbar page="Profile" />
            <Container maxWidth={false} sx={{ maxWidth: '500px' }}>
                <div>
                    <div className="m-5">
                        <div>
                            <div className="flex">
                                <Avatar sx={{ height: '150px', width: '150px' }} alt={userData.fullName} src={`${process.env.REACT_APP_API_URL}/profilePicture/${userData.profilePicture}`} />
                                <div className="flex items-end">
                                    <IconButton sx={{ height: '40px', width: '40px' }} onClick={handleEdit}>
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            </div>
                            {
                                edit ?
                                    <input className='mt-3 mx-2' type="file" ref={_profilePicture} />
                                    :
                                    <></>
                            }
                        </div>
                        <div className="my-5 mx-2 text-3xl">
                            {
                                edit ?
                                    <TextField
                                        required
                                        id="outlined-required"
                                        defaultValue={userData.fullName}
                                        sx={{ width: '250px' }}
                                        label="Full Name"
                                        size="large"
                                        inputRef={_fullName}
                                    />
                                    :
                                    <div>
                                        {userData.fullName}
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="text-2xl my-5 mx-8">
                        <div className="italic">
                            Bio
                        </div>
                        {
                            edit ?
                                <TextField
                                    required
                                    id="outlined-required"
                                    defaultValue={userData.bio}
                                    sx={{ width: '250px' }}
                                    size="small"
                                    inputRef={_bio}
                                />
                                :
                                <div className="text-lg">
                                    {userData.bio}
                                </div>
                        }
                    </div>
                    <div className="text-2xl my-5 mx-8">
                        <div className="italic">
                            Username
                        </div>
                        {
                            edit ?
                                <TextField
                                    required
                                    id="outlined-required"
                                    defaultValue={userData.username}
                                    sx={{ width: '250px' }}
                                    size="small"
                                    inputRef={_username}
                                />
                                :
                                <div className="text-lg">
                                    {userData.username}
                                </div>
                        }
                    </div>
                    <div className="text-2xl my-5 mx-8">
                        <div className="italic">
                            Email
                        </div>
                        <div className="text-lg">
                            {userData.email}
                        </div>
                    </div>
                    <div className="text-2xl my-5 mx-8">
                        {
                            edit ?
                                <Button onClick={handleSubmit}>Save</Button>
                                :
                                null
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}