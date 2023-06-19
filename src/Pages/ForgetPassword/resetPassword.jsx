import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../API/userAPI';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ResetPassword() {
    const [showPassword, setShowPassword] = React.useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(true)
    const _password = React.useRef()
    const _passwordConfirm = React.useRef()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const onShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const onShowConfirmPassword = () => {
        if (showConfirmPassword) {
            setShowConfirmPassword(false)
        } else {
            setShowConfirmPassword(true)
        }
    }

    const onResetPassword = async () => {
        try {
            const password = _password.current.value
            const passwordConfirm = _passwordConfirm.current.value
            let token = searchParams.get('token')
            const isPasswordValid = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

            if (password === passwordConfirm) {
                if (isPasswordValid.test(password)) {
                    const result = await resetPassword({ password, token })
                    if(result.data?.success){
                        toast.success('Reset Password Success')

                        setTimeout(() => {
                            navigate('/login')
                        }, 1000);
                    }
                } else {
                    const errorMessage = "weak password"
                    throw errorMessage
                }
            } else {
                const errorMessage = "password is not valid"
                throw errorMessage
            }

        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new-password"
                            label="New Password"
                            type={!showPassword ? 'text' : 'password'}
                            id="new password"
                            autoComplete="current-password"
                            inputRef={_password}
                            InputProps={
                                showPassword ?
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => onShowPassword()} aria-label="delete" color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                    :
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => onShowPassword()} aria-label="delete" color="primary">
                                                    <VisibilityOffIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new-password"
                            label="Confirm Password"
                            type={!showConfirmPassword ? 'text' : 'password'}
                            id="new password"
                            autoComplete="current-password"
                            inputRef={_passwordConfirm}
                            InputProps={
                                showConfirmPassword ?
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => onShowConfirmPassword()} aria-label="delete" color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                    :
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => onShowConfirmPassword()} aria-label="delete" color="primary">
                                                    <VisibilityOffIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                            }
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onResetPassword}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}