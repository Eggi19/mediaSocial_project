import axios from "axios"

export function getPostData() {
    return axios.get(`${process.env.REACT_APP_API_URL}/posts/`)
}

export function createPost(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/posts/single-upload`,
        {
            caption: data.caption,
            userId: data.userId,
            image: data.image
        },
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )
}

export function likePost(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/posts/like`, {
        postId: data.postId,
        userId: data.userId
    })
}

export function deletePost(postId) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
}

export function editPost(data) {
    return axios.put(`${process.env.REACT_APP_API_URL}/posts/${data.postId}`, {
        caption: data.caption
    })
}
