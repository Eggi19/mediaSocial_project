import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from '../../API/userAPI';
import { useNavigate } from 'react-router-dom';

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

export default function RegisterPage() {
    const [showPassword, setShowPassword] = React.useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(true)
    const _firstName = React.useRef()
    const _lastName = React.useRef()
    const _username = React.useRef()
    const _email = React.useRef()
    const _password = React.useRef()
    const _passwordConfirm = React.useRef()
    const navigate = useNavigate()
    const [process, setProcess] = React.useState(true)

    const handleSubmit = async () => {
        setProcess(false)
        const firstName = _firstName.current.value
        const lastName = _lastName.current.value
        const username = _username.current.value
        const email = _email.current.value
        const password = _password.current.value
        const passwordConfirm = _passwordConfirm.current.value
        const isPasswordValid = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        const isEmail = new RegExp('[a-z0-9]+@[a-z]+[a-z]{2,3}')

        if (firstName && lastName && username && email && password && passwordConfirm) {
            if (isEmail.test(email)) {
                if (password === passwordConfirm) {
                    if (isPasswordValid.test(password)) {
                        const result = await registerUser({
                            firstName,
                            lastName,
                            username,
                            email,
                            password,
                            passwordConfirm
                        })

                        if (result.data?.success) {
                            _firstName.current.value = ""
                            _lastName.current.value = ""
                            _username.current.value = ""
                            _email.current.value = ""
                            _password.current.value = ""
                            _passwordConfirm.current.value = ""

                            toast.success('Register Success')

                            setTimeout(() => {
                                navigate("/login")
                            }, 1000)
                        } else {
                            toast.error(result.data?.message)
                        }
                    } else {
                        toast.error("Password is weak")
                    }
                } else {
                    toast.error("Password Does Not Match")
                }
            } else {
                toast.error("Email Is Not Valid")
            }
        } else {
            toast.error("Complete The Form")
        }
        setProcess(true)
    };

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

    const protectRegister = () => {
        const isLogin = localStorage.getItem('id')
        if(isLogin){
            navigate('/posts')
        }
    }

    React.useEffect(() => {
        protectRegister()
    }, [])
    
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    inputRef={_firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    inputRef={_lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    inputRef={_username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={_email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={!showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="new-password"
                                    inputRef={_password}
                                    helperText="Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number."
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Password Confirmation"
                                    type={!showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    autoComplete="new-password"
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
                            </Grid>
                        </Grid>
                        {
                            process ?
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                >
                                    Sign Up
                                </Button>
                                :
                                <Button
                                    disabled
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                >
                                    Sign Up
                                </Button>
                        }
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}