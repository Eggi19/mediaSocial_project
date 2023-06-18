import axios from "axios"

export function getPostData(data){
    return axios.get(`${process.env.REACT_APP_API_URL}/posts/`)
}
