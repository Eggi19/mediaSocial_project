import axios from "axios"

export function getPostData() {
    return axios.get(`${process.env.REACT_APP_API_URL}/posts/`)
}

export function likePost(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/posts/like`, {
        postId: data.postId,
        userId: data.userId
    })
}
