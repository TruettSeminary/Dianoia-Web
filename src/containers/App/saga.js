import { fork, call, put, takeLatest, select } from 'redux-saga/effects'; 

import API from 'utils/API/index'; 
import auth from 'utils/auth'; 

import {
    SUBMIT_LOGIN, 
    LOGOUT
} from './constants'; 


import {
    loginSucceeded, 
    loginFailed, 
    logoutSucceeded
} from './actions'; 


export function* submitLogin(action) {
    try {
        const response = yield API.getUser(action.data.email, action.data.password); 
        
        if(response.jwt) {
            // TODO: add a "remember me" porition to saving the authentication 
            yield call(auth.setToken, response.jwt); 
            yield call(auth.setUserInfo, response.user); 
        }
        
        yield put(loginSucceeded({
            ...response.user, 
            jwt: response.jwt
        })); 
    } catch(error) {
        yield put(loginFailed()); 
    }
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
    yield fork(takeLatest, LOGOUT, logout); 
}