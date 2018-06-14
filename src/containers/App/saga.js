import { fork, call, put, takeLatest } from 'redux-saga/effects'; 

import { push } from 'connected-react-router'; 

import Dianoia from 'utils/API/index'; 
import auth from 'utils/auth'; 

import { notify } from 'utils/notification'; 

import {
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_SUCCESS, 
    LOGIN_SUBMIT_FAIL, 
    LOGOUT
} from './constants'; 


import {
    loginSucceeded, 
    loginFailed, 
    logoutSucceeded, 
    refreshUser
} from './actions'; 


export function* submitLogin(action) {
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
    yield put(push('/home')); 
}

export function* loginFailedSaga(action) {
    // TODO:  check which message should be sent based on action
    yield call(notify, action.error.response.payload.message, 'danger'); 
}

export function* logout(action) {
    try {
        yield call(auth.clearToken); 
        yield call(auth.clearUserInfo);
        yield put(logoutSucceeded({jwt: ''}))
    } catch(error) {
        
    }
}

export default function* defaultSaga() {
    yield fork(takeLatest, SUBMIT_LOGIN, submitLogin);
    yield fork(takeLatest, LOGIN_SUBMIT_SUCCESS, loginSucceededSaga);
    yield fork(takeLatest, LOGIN_SUBMIT_FAIL, loginFailedSaga); 
    yield fork(takeLatest, LOGOUT, logout); 
}