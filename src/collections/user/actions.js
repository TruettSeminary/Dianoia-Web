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
    RESET_USER, 
    SUBMIT_FORGOT_PASSWORD,
    SUBMIT_FORGOT_PASSWORD_SUCCESS,
    SUBMIT_FORGOT_PASSWORD_FAIL,
    SUBMIT_RESET_PASSWORD,
    SUBMIT_RESET_PASSWORD_SUCCESS,
    SUBMIT_RESET_PASSWORD_FAIL
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

export function submitForgotPassword(email) {
    return {
        type: SUBMIT_FORGOT_PASSWORD, 
        data: {
            email
        }
    }
}

export function submitForgotPasswordSucceeded() {
    return {
        type: SUBMIT_FORGOT_PASSWORD_SUCCESS
    }
}

export function submitForgotPasswordFailed(error) {
    return {
        type: SUBMIT_FORGOT_PASSWORD_FAIL,
        error
    }
}

export function submitResetPassword(code, password, passwordConfirmation) {
    return {
        type: SUBMIT_RESET_PASSWORD, 
        data: {
            code,
            password, 
            passwordConfirmation
        }
    }
}

export function submitResetPasswordSucceeded(user) {
    return {
        type: SUBMIT_RESET_PASSWORD_SUCCESS, 
        user
    }
}

export function submitResetPasswordFailed(error) {
    return {
        type: SUBMIT_RESET_PASSWORD_FAIL,
        error
    }
}