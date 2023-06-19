import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginRequest } from '../../API/userAPI';
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

export default function LoginPage() {
  const _usernameOrEmail = React.useRef()
  const _password = React.useRef()
  const [process, setProcess] = React.useState(true)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(true)

  const handleSubmit = async () => {
    try {
      setProcess(false)
      const usernameOrEmail = _usernameOrEmail.current.value
      const password = _password.current.value

      if (usernameOrEmail && password) {
        const result = await loginRequest({ usernameOrEmail, password })

        if (result.data?.success) {
          localStorage.setItem('id', result.data?.data?.id)
          toast.success('Login Success!')
          _usernameOrEmail.current.value = ""
          _password.current.value = ""

          setTimeout(() => {
            navigate("/posts")
          }, 1000);
        } else {
          const errorMessage = { message: result.data?.message }
          throw errorMessage
        }
      } else {
        const errorMessage = { message: "Please Complete The Form" }
        throw errorMessage
      }
      setProcess(true)
    } catch (error) {
      toast.error(error.message)
    }
  };

  const protectLoginPage = () => {
    const isLogin = localStorage.getItem('id')
    if (isLogin) {
      navigate('/posts')
    }
  }

  const onShowPassword = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  React.useEffect(() => {
    protectLoginPage()
  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email or Username"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={_usernameOrEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={!showPassword ? 'text' : 'password'}
                id="password"
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
              {
                process ?
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                  : <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                    disabled
                  >
                    Sign In
                  </Button>
              }
              <Grid container>
                <Grid item xs>
                  <Link onClick={() => navigate('/send-email-forget-password')} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}