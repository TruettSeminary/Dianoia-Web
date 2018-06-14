import { fork, call, put, takeLatest } from 'redux-saga/effects'; 

// Utils
import Dianoia from 'utils/API/index'; 
import auth from 'utils/auth'; 

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
    REGISTRATION_SUBMIT_FAIL
} from './constants'; 

import {
    loginSucceeded, 
    loginFailed, 
    logoutSucceeded, 
    refreshUser,
    registrationSucceeded, 
    registrationFailed
} from './actions'; 

export function* submitLoginSaga(action) {
    try {
        const response = yield Dianoia.loginUser(action.data.email, action.data.password); 
        
        if(response.jwt) {
            // Valid login
            Dianoia.setJWT(response.jwt); 

            // TODO: add a "remember me" porition to saving the authentication 
            yield call(auth.setToken, response.jwt); 
            yield call(auth.setUserInfo, response.user); 

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
}

export function* loginFailedSaga(action) {
    // TODO:  check which message should be sent based on action
    yield call(notify, action.error.response.payload.message, 'danger'); 
}

export function* logoutSaga(action) {
    try {
        yield call(auth.clearToken); 
        yield call(auth.clearUserInfo);
        yield put(logoutSucceeded({jwt: ''}))
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
            yield call(auth.setToken, response.jwt); 
            yield call(auth.setUserInfo, response.user); 
        }

        yield put(registrationSucceeded({
            ...response.user, 
            jwt: response.jwt
        })); 

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
    yield fork(takeLatest, SUBMIT_LOGIN, submitLoginSaga);
    yield fork(takeLatest, LOGIN_SUBMIT_SUCCESS, loginSucceededSaga);
    yield fork(takeLatest, LOGIN_SUBMIT_FAIL, loginFailedSaga); 
    yield fork(takeLatest, LOGOUT, logoutSaga);
    yield fork(takeLatest, SUBMIT_REGISTRATION, submitRegistrationSaga); 
    yield fork(takeLatest, REGISTRATION_SUBMIT_SUCCESS, registrationSucceededSaga);
    yield fork(takeLatest, REGISTRATION_SUBMIT_FAIL, registrationFailedSaga);  
}