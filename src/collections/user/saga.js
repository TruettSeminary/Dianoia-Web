import { fork, call, put, takeLatest } from 'redux-saga/effects'; 

// Utils
import Dianoia from 'utils/API/index'; 

// App "Connections" 
import { push } from 'connected-react-router'; 
import { notify } from 'utils/notification'; 

import {
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_SUCCESS, 
    LOGIN_SUBMIT_FAIL, 
    LOGOUT,
    SUBMIT_REGISTRATION,
    REGISTRATION_SUBMIT_SUCCESS, 
    REGISTRATION_SUBMIT_FAIL,
    UPDATE_JWT
} from './constants'; 

import {
    updateJWT,
    loginSucceeded, 
    loginFailed, 
    refreshUser,
    registrationSucceeded, 
    registrationFailed, 
    resetUser
} from './actions'; 

import {
    getAllClasses,
    resetClasses
} from 'collections/classes/actions'

import {
    getAllUserDecks,
    resetDecks
} from 'collections/decks/actions'; 

import { resetCards } from 'collections/cards/actions'; 
import { resetNotes } from 'collections/notes/actions'; 

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
    // TODO: close login modal

    // TODO: figure out how to update current page
    // --> Might be something in the app that watches the page? 
    yield put(push('/home')); 

    // Get all page data that requires authentication
    yield put(getAllClasses()); 
    yield put(getAllUserDecks()); 
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
        yield put(resetNotes()); 
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
        yield put(push('/home'));
    } catch(error) {
        console.error(error); 
    }
}

export function* registrationFailedSaga(action) {
    yield call(notify, action.error.response.payload.message, 'danger'); 
    // TODO: update update registration state based on this 
    // i.e. show error if email is taken
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
}