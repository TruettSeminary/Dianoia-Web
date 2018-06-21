import {
    UPDATE_JWT,
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_FAIL,
    LOGIN_SUBMIT_SUCCESS, 
    LOGOUT,
    REFRESH_USER,
    REFRESH_USER_CLASSES, 
    REFRESH_USER_DECKS, 
    SUBMIT_REGISTRATION, 
    REGISTRATION_SUBMIT_SUCCESS,
    REGISTRATION_SUBMIT_FAIL,
    RESET_USER
} from './constants';

export function updateJWT(jwt) {
    return {
        type: UPDATE_JWT, 
        jwt
    }
}

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

export function resetUser() {
    return {
        type: RESET_USER
    }
}

export function refreshUser(user) {
    return {
        type: REFRESH_USER, 
        user
    }
}

export function refreshUserClasses(userClasses) {
    return {
        type: REFRESH_USER_CLASSES, 
        userClasses
    }
}

export function refreshUserDecks(userDecks) {
    return {
        type: REFRESH_USER_DECKS, 
        userDecks
    }
}


export function submitRegistration(email, password, first_name, last_name) {
    return {
        type: SUBMIT_REGISTRATION, 
        data: {
            email, 
            password, 
            first_name, 
            last_name
        }
    };
}

export function registrationSucceeded(user) {
    return {
        type: REGISTRATION_SUBMIT_SUCCESS,
        user
    }
}

export function registrationFailed(error) {
    return {
        type: REGISTRATION_SUBMIT_FAIL,
        error
    }
}