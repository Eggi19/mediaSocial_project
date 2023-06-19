import axios from "axios"

export function registerUser(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/users/`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        passwordConfirm: data.passwordConfirm
    })
}

export function userVerification(token) {
    return axios.post(`${process.env.REACT_APP_API_URL}/users/verification`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function loginRequest(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/login/`, {
        usernameOrEmail: data.usernameOrEmail,
        password: data.password
    })
}

export function getUser(userId) {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
}

export function editProfile(data) {
    return axios.put(`${process.env.REACT_APP_API_URL}/users/edit/${data.userId}`,
        {
            profilePicture: data.profilePicture,
            username: data.username,
            fullName: data.fullName,
            bio: data.bio
        },
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )
}

export function sendEmail(email) {
    return axios.post(`${process.env.REACT_APP_API_URL}/users/send-email`, {
        email: email
    })
}
