import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import { createPost, getPostData, likePost } from '../../API/postAPI';
import Button from '@mui/material/Button';
import Navbar from '../../Component/navbar';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function PostingPage() {
    const [postData, setPostData] = React.useState([])
    const _caption = React.useRef()
    const _image = React.useRef()

    const callPostData = async () => {
        try {
            const result = await getPostData()

            setPostData(result.data?.data)
        } catch (error) {

        }
    }

    const onLikePost = async (postId) => {
        try {
            const userId = localStorage.getItem('id')
            await likePost({ postId, userId })
            callPostData()
        } catch (error) {

        }
    }

    const onCreatePost = async () => {
        try {
            const userId = localStorage.getItem('id')
            const caption = _caption.current.value
            const image = _image.current.files[0]
            const result = await createPost({userId, caption, image})

            if(result?.data?.success){
                _caption.current.value = ""
                _image.current.files = ""
            }
            callPostData()
        } catch (error) {
            
        }
    }

    React.useEffect(() => {
        callPostData()
    }, [])
    return (
        <Box>
            <Navbar page="Timeline" />
            <Container maxWidth={false} sx={{ maxWidth: '500px' }}>
                <div className='py-3 flex flex-col'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Caption"
                        multiline
                        rows={2}
                        defaultValue=""
                        inputRef={_caption}
                    />
                    <TextField
                        type='file'
                        inputRef={_image}
                    />
                    <Button variant="contained" onClick={onCreatePost}>Upload</Button>
                </div>
                {/* End hero unit */}
                <Grid container spacing={8} direction={"column"} alignItems="center" justifyContent="center">
                    {postData.map((value) => (
                        <Grid item key={value} xs={12} sm={6} md={4}>
                            <Card sx={{ width: 400 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={`${process.env.REACT_APP_API_URL}/profilePicture/${value.User?.profilePicture}`}></Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={value.User?.fullName}
                                    subheader={value.createdAt.split('T')[0]}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={`${process.env.REACT_APP_API_URL}/image/${value.image}`}
                                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                />
                                <CardContent>
                                    <Typography variant="body1" color="text.secondary">
                                        {value.caption}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.Likes?.length} Like, {value.Comments?.length} Comment
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites" onClick={() => onLikePost(value.id)}>
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </Box >
    );
}
