import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getPostData } from '../../API/postAPI';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PostingPage() {
    const [postData, setPostData] = React.useState([])

    const callPostData = async() => {
        try {
            const result = await getPostData()

            setPostData(result.data?.data)
        } catch (error) {
            
        }
    }

    React.useEffect(() => {
        callPostData()
    }, [])
    return (
        <Container
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
        >
            <main>
                <Container sx={{ px: 40 }} maxWidth="md">
                    {/* End hero unit */}
                    {postData.map((value) => (
                        <Card
                            sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={`${process.env.REACT_APP_API_URL}/image/${value.image}`}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography>
                                   {value.caption}
                                </Typography>
                                <Typography>
                                   {value.Likes?.length} Like, {value.Comments?.length} Comment
                                </Typography>
                                <Typography>
                                   post created at: {value.createdAt.split('T')[0]}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Like</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Container>
            </main>
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
        </Container >
    );
}
