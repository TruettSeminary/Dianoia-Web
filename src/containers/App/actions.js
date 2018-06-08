import {
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_FAIL,
    LOGIN_SUBMIT_SUCCESS, 
    LOGOUT, 
    LOGOUT_SUCCESS,
    SET_ERRORS, 
    DISPLAY_LOGIN,
    HIDE_LOGIN,
    REQUEST_REGISTRATION, 
    REQUEST_FORGOT_PASSWORD
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

export function loginFailed() {
    return {
        type: LOGIN_SUBMIT_FAIL
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