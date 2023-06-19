import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { getUser } from '../API/userAPI';
import { useEffect, useState } from 'react';

export default function Navbar(props) {
    const [profilePicture, setProfilePicture] = useState('')
    const navigate = useNavigate()
    const onLogout = () => {
        localStorage.removeItem('id')
        navigate('/login')
    }

    const getProfilePicture = async () => {
        try {
            const userId = localStorage.getItem('id')
            const result = await getUser(userId)
            console.log(result);
            setProfilePicture(result.data?.data?.profilePicture)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getProfilePicture()
    }, [])

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <div className='p-3'>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <div className='flex items-center'>
                                <IconButton onClick={() => navigate('/posts')}>
                                    <HomeIcon sx={{ mr: 2 }} />
                                </IconButton>
                            </div>
                            <div className='flex items-center text-xl'>
                                {props.page}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='hover:cursor-pointer'>
                                <Avatar src={`${process.env.REACT_APP_API_URL}/profilePicture/${profilePicture}`} sx={{ bgcolor: red[500] }} aria-label="recipe" onClick={() => navigate('/profile')}></Avatar>
                            </div>
                            <IconButton aria-label="settings" onClick={onLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </AppBar>
        </>
    )
}
