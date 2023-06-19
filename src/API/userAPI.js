import axios from "axios"

export function registerUser(data){
    return axios.post(`${process.env.REACT_APP_API_URL}/users/`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        passwordConfirm: data.passwordConfirm
    })
}

export function userVerification(token){
    return axios.post(`${process.env.REACT_APP_API_URL}/users/verification`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function loginRequest(data){
    return axios.post(`${process.env.REACT_APP_API_URL}/login/`, {
        usernameOrEmail: data.usernameOrEmail,
        password: data.password
    })
}

export function getUser(userId){
    return axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
}
