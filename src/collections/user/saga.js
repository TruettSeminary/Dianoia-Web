// TODO: remove redudancy in sagas

import { fork, call, put, takeLatest } from 'redux-saga/effects'; 

// Utils
import Dianoia from 'utils/API/index'; 

// App "Connections" 
import { push } from 'connected-react-router'; 

// Constants
import {
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_SUCCESS, 
    LOGIN_SUBMIT_FAIL, 
    LOGOUT,
    SUBMIT_REGISTRATION,
    REGISTRATION_SUBMIT_SUCCESS, 
    REGISTRATION_SUBMIT_FAIL,
    UPDATE_JWT,
    SUBMIT_FORGOT_PASSWORD,
    SUBMIT_FORGOT_PASSWORD_FAIL,
    SUBMIT_RESET_PASSWORD,
    SUBMIT_RESET_PASSWORD_SUCCESS,
    SUBMIT_RESET_PASSWORD_FAIL
} from './constants'; 

// Actions
import { notify } from 'utils/notification'; 
import { closeLoginModal } from 'collections/ui/actions'; 

import {
    updateJWT,
    loginSucceeded, 
    loginFailed, 
    refreshUser,
    registrationSucceeded, 
    registrationFailed, 
    resetUser,
    submitForgotPasswordFailed,
    submitResetPasswordSucceeded,
    submitResetPasswordFailed
} from './actions'; 

import { getAllClasses, resetClasses } from 'collections/classes/actions'
import { getAllUserDecks, resetDecks } from 'collections/decks/actions'; 
import { getAllCards,resetCards } from 'collections/cards/actions'; 

export function* updateJWTSaga(action) {
    try {
        yield Dianoia.setJWT(action.jwt);
    } catch(error) {

    }
}

export function* submitLoginSaga(action) {
    try {
        const response = yield Dianoia.loginUser(action.data.email, action.data.password); 
        
        if(response.jwt) {
            // Valid login
            
            yield put(updateJWT(response.jwt));

            // TODO: add a "remember me" porition to saving the authentication 
            yield put(loginSucceeded({
                ...response.user, 
                jwt: response.jwt
            })); 
        }
    } catch(error) {
        yield put(loginFailed(error)); 
    }
}


export function* loginSucceededSaga(action) {
    
    // update API JWT
    yield put(refreshUser(action.user)); 

    // update location and UI
    yield put(push('/home'));
    yield put(closeLoginModal());  

    // Get all page data that requires authentication
    yield put(getAllClasses()); 
    yield put(getAllUserDecks()); 
    yield put(getAllCards());
}

export function* loginFailedSaga(action) {
    // TODO:  check which message should be sent based on action
    yield call(notify, action.error.response.payload.message, 'danger'); 
}

export function* logoutSaga(action) {
    try {
        // TODO: clean this up
        yield put(updateJWT('')); 
        yield put(resetUser()); 
        yield put(resetClasses());
        yield put(resetDecks());
        yield put(resetCards());
    } catch(error) {
        
    }
}

export function* submitRegistrationSaga(action) {
    try {
        const response = yield Dianoia.registerUser(
            action.data.email, 
            action.data.password,
            action.data.first_name,
            action.data.last_name
        );

        if(response.jwt) {
            // TODO: find better place for this
            Dianoia.setJWT(response.jwt);
            yield put(registrationSucceeded({
                ...response.user, 
                jwt: response.jwt
            })); 
        }

    } catch(error) {
        yield put(registrationFailed(error)); 
    }
}

export function* registrationSucceededSaga(action) {
    try {
        yield put(refreshUser(action.user)); 
        yield put(getAllClasses()); 
        yield put(getAllUserDecks()); 
        yield put(getAllCards());
        yield put(push('/home'));
    } catch(error) {
        console.error(error); 
    }
}

export function* registrationFailedSaga(action) {
    yield call(notify, action.error.response.payload.message, 'danger'); 
}

export function* submitForgotPasswordSaga(action) {
    
    try {
        const resetURL = window.location.origin + '/reset-password'; 

        const response = yield Dianoia.sendForgotPasswordLink(action.data.email, resetURL); 
        if(response.ok) {
            yield call(notify, `A reset token has been sent to ${action.data.email}`, 'success')
        } else {
            throw new Error('Something went wrong sending email');
        }
    } catch(error) {
        yield put(submitForgotPasswordFailed(error))
    }
}

export function* submitForgotPasswordFailedSaga(action) {
    yield call(notify, action.error.response.payload.message, 'danger'); 
}

export function* submitResetPasswordSaga(action) {
    try {
        const {code, password, passwordConfirmation } = action.data; 
        console.log(code); 
        const response = yield Dianoia.resetPassword(code, password, passwordConfirmation);
        if(response.jwt) {
            Dianoia.setJWT(response.jwt);
            yield put(submitResetPasswordSucceeded({
                ...response.user, 
                jwt: response.jwt
            })); 
        }

    } catch(error) {
        yield put(submitResetPasswordFailed(error))
    }
}

export function* submitResetPasswordSucceededSaga(action) {
    try {
        yield put(refreshUser(action.user)); 
        yield put(getAllClasses()); 
        yield put(getAllUserDecks()); 
        yield put(getAllCards());
        yield put(push('/home'));
    } catch(error) {
        console.error(error); 
    }
}


export function* submitResetPasswordFailedSaga(action) {
    yield call(notify, action.error.response.payload.message, 'danger'); 
}

export default function* defaultSaga() {
    yield fork(takeLatest, UPDATE_JWT, updateJWTSaga); 

    yield fork(takeLatest, SUBMIT_LOGIN, submitLoginSaga);
    yield fork(takeLatest, LOGIN_SUBMIT_SUCCESS, loginSucceededSaga);
    yield fork(takeLatest, LOGIN_SUBMIT_FAIL, loginFailedSaga); 
    yield fork(takeLatest, LOGOUT, logoutSaga);

    yield fork(takeLatest, SUBMIT_REGISTRATION, submitRegistrationSaga); 
    yield fork(takeLatest, REGISTRATION_SUBMIT_SUCCESS, registrationSucceededSaga);
    yield fork(takeLatest, REGISTRATION_SUBMIT_FAIL, registrationFailedSaga);  

    yield fork(takeLatest, SUBMIT_FORGOT_PASSWORD, submitForgotPasswordSaga);
    yield fork(takeLatest, SUBMIT_FORGOT_PASSWORD_FAIL, submitForgotPasswordFailedSaga); 

    yield fork(takeLatest, SUBMIT_RESET_PASSWORD, submitResetPasswordSaga); 
    yield fork(takeLatest, SUBMIT_RESET_PASSWORD_SUCCESS, submitResetPasswordSucceededSaga); 
    yield fork(takeLatest, SUBMIT_RESET_PASSWORD_FAIL, submitResetPasswordFailedSaga); 
}