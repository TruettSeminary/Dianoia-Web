import { fork, call, put, takeLatest } from 'redux-saga/effects'; 

import Dianoia from 'utils/API/index';
import auth from 'utils/auth';  

import {
    GET_ALL_CLASSES, 
    ADD_CLASS_TO_USER,
    ADD_CLASS_TO_USER_SUCCESS, 
    REMOVE_CLASS_FROM_USER,
    REMOVE_CLASS_FROM_USER_SUCCESS
} from './constants';

import {
    addClassToUserSucceeded, 
    removeClassFromUserSucceeded, 
    refreshClasses
} from './actions';

export function* getAllClassesSaga(action) {
    try {
        const response = yield Dianoia.getAllClasses(); 
        if(Array.isArray(response)) {

            // classes received
            yield put(refreshClasses(response))
        }
    } catch(error) {

    }
}

export function* addClassToUserSaga(action) {
    try {
        // get current user
        console.log('adding user'); 
        console.log(action.data); 
        const user = auth.getUserInfo(); 

        const response = Dianoia.addClassToUser(user, action.data.class_id); 


        const classCheck = (class_id) => { return response.classes.reduce((accVal, clazz) => {
            return accVal || (class_id === clazz._id); 
        }, false)}

        if(Array.isArray(response.classes) && classCheck(action.data.class_id)) {
            // success
            yield put(addClassToUserSucceeded(response.classes)); 
        }

    } catch(error) {
        // TODO: handle error
        console.log(error); 
    }
}

export function* removeClassFromUserSaga(action) {
    try {
        // get current user
        console.log('removing user'); 
        console.log(action.data); 
        const user = auth.getUserInfo(); 
        console.log(user); 
        const response = Dianoia.removeClassFromUser(user, action.data.class_id); 


        const classCheck = (class_id) => { return response.classes.reduce((accVal, clazz) => {
            return accVal && (class_id !== clazz._id); 
        }, true)}

        if(Array.isArray(response.classes) && classCheck(action.data.class_id)) {
            // success
            yield put(removeClassFromUserSucceeded(response.classes)); 
        }
    } catch(error) {
        // TODO: handle error
        console.log(error); 
    }
}

export function* classModificationSuccessSaga(action) {
    try {
        yield put(refreshClasses(action.data.classes)); 
    } catch(error) {
        // Silent
    }
}

export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_CLASSES, getAllClassesSaga);
    yield fork(takeLatest, ADD_CLASS_TO_USER, addClassToUserSaga);
    yield fork(takeLatest, REMOVE_CLASS_FROM_USER, removeClassFromUserSaga);
    yield fork(takeLatest, ADD_CLASS_TO_USER_SUCCESS, classModificationSuccessSaga); 
    yield fork(takeLatest, REMOVE_CLASS_FROM_USER_SUCCESS, classModificationSuccessSaga); 

}