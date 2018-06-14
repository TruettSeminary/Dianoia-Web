import { fork, call, put, takeLatest } from 'redux-saga/effects'; 
import { push } from 'connected-react-router'

import Dianoia from 'utils/API/index'; 
import auth from 'utils/auth'; 

import { notify } from 'utils/notification'; 

import {
    SUBMIT_REGISTRATION,
    REGISTRATION_SUBMIT_SUCCESS, 
    REGISTRATION_SUBMIT_FAIL
} from './constants';

import {
    registrationSucceeded, 
    registrationFailed
} from './actions'; 

import {
    refreshUser
} from '../App/actions';

export function* submitRegistration(action) {
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
    yield notify(action.error.response.payload.message, 'danger'); 
    // TODO: update update registration state based on this
}

export default function* defaultSaga() {
    yield fork(takeLatest, SUBMIT_REGISTRATION, submitRegistration); 
    yield fork(takeLatest, REGISTRATION_SUBMIT_SUCCESS, registrationSucceededSaga);
    yield fork(takeLatest, REGISTRATION_SUBMIT_FAIL, registrationFailedSaga); 
}