import {
    SUBMIT_REGISTRATION, 
    REGISTRATION_SUBMIT_SUCCESS,
    REGISTRATION_SUBMIT_FAIL
} from './constants';

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
