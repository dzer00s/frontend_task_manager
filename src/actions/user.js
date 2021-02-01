import axios from "axios";

export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const GET_USERS = 'GET_USERS';

// ACTIONS
export const logout = () => ({ type: LOGOUT })
export const setUser = (user) => ({ type: SET_USER, payload: user })
export const getUsers = (users) => ({ type: GET_USERS, payload: users })

export const registrationUser = async (values) => {
    try {
        let requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(values),
            redirect: 'follow'
        };
        const response = await fetch("http://localhost:5000/api/registration", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        console.log(response)
    } catch (e) {
        alert(e)
    }
}

export const loginUser = (values) => {
    return async dispatch => {
        try {
            const username = values.username;
            const password = values.password;
            const response = await axios.post("http://localhost:5000/api/login", { username, password })
            // console.log(response.data.user)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            // .catch(error => console.log('error', error));
        }
        catch (e) {
            //     alert(e)
        }
    }
}

export const authUser = () => {
    return async dispatch => {
        try {
            console.log("render")
            const response = await axios.get("http://localhost:5000/api/auth",
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            // console.log(response.data.user)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            // .catch(error => console.log('error', error));
        }
        catch (e) {
            // localStorage.removeItem('token')
        }
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        try {
            console.log("getUsers")
            const response = await axios.get("http://localhost:5000/api/users")
            dispatch(getUsers(response.data))
        }
        catch (e) {
        }
    }
}