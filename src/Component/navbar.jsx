import CssBaseline from '@mui/material/CssBaseline';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import AppBar from '@mui/material/AppBar';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    const navigate = useNavigate()
    const onLogout = () => {
        localStorage.removeItem('id')
        navigate('/login')
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <div className='p-3'>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <CameraIcon sx={{ mr: 2 }} />
                            <Typography variant="h6" color="inherit" noWrap>
                                {props.page}
                            </Typography>
                        </div>
                        <div className='flex'>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
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
