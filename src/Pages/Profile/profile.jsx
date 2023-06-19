import { useEffect, useState } from "react";
import Navbar from "../../Component/navbar";
import Avatar from '@mui/material/Avatar';
import { getUser } from "../../API/userAPI";
import { Container, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function ProfilePage() {
    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        try {
            const userId = localStorage.getItem('id')
            const dataUser = await getUser(userId)
            setUserData(dataUser?.data?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <>
            <Navbar page="Profile" />
            <Container maxWidth={false} sx={{ maxWidth: '500px' }}>
                <div>
                    <div className="m-5">
                        <div className="flex">
                            <Avatar sx={{ height: '150px', width: '150px' }} alt={userData.fullName} src={`${process.env.REACT_APP_API_URL}/profilePicture/${userData.profilePicture}`} />
                            <div className="flex items-end">
                                <IconButton sx={{ height: '40px', width: '40px' }}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className="my-5 mx-2 text-3xl">
                            {userData.fullName}
                        </div>
                    </div>
                    <div className="text-2xl my-5 mx-8">
                        <div className="italic">
                            Bio
                        </div>
                        <div className="text-lg">
                            {userData.bio}
                        </div>
                    </div>
                    <div className="text-2xl my-5 mx-8">
                        <div className="italic">
                            Username
                        </div>
                        <div className="text-lg">
                            {userData.username}
                        </div>
                    </div>
                    <div className="text-2xl my-5 mx-8">
                        <div className="italic">
                            Email
                        </div>
                        <div className="text-lg">
                            {userData.email}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}