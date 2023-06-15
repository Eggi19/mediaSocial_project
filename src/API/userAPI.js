const axios = require("axios")

export default function registerUser(data){
    return axios.post(`${process.env.REACT_APP_API_URL}/users/`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        passwordConfirm: data.passwordConfirm
    })
}
