import {
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_FAIL,
    LOGIN_SUBMIT_SUCCESS, 
    LOGOUT, 
    LOGOUT_SUCCESS,
    REFRESH_USER,
    DISPLAY_LOGIN,
    HIDE_LOGIN
} from './constants';

export function submitLogin(email, password) {
    return {
        type: SUBMIT_LOGIN, 
        data: {
            email, 
            password
        }
    }
}

export function loginSucceeded(user) {
    return {
        type: LOGIN_SUBMIT_SUCCESS,
        user
    }
}

export function loginFailed(error) {
    return {
        type: LOGIN_SUBMIT_FAIL, 
        error
    }
}


export function logout() {
    return {
        type: LOGOUT
    }
}

export function logoutSucceeded(user) {
    return {
        type: LOGOUT_SUCCESS, 
        user
    }
}

export function refreshUser(user) {
    return {
        type: REFRESH_USER, 
        user
    }
}

export function displayLogin() {
    return {
        type: DISPLAY_LOGIN, 
        value: true
    }
}

export function hideLogin(value) {
    return {
        type: HIDE_LOGIN, 
        value: false
    }
}