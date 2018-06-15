import { fork, put, takeLatest } from 'redux-saga/effects'; 

import Dianoia from 'utils/API/index';

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

import {
    refreshUserClasses, 
    refreshUserDecks
} from 'collections/user/actions'; 

export function* getAllClassesSaga(action) {
    try {
        // TODO: get from cache if possible
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
        const response = yield Dianoia.addClassToUser(action.data.user, action.data.class_id);
        if(Array.isArray(response.classes)) {
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
        const response = yield Dianoia.removeClassFromUser(action.data.user, action.data.class_id); 

        if(Array.isArray(response.classes)) {
            // success
            yield put(removeClassFromUserSucceeded(response.classes, response.decks)); 
        }
    } catch(error) {
        // TODO: handle error
        console.log(error); 
    }
}

export function* classModificationSuccessSaga(action) {
    try {
        yield put(refreshUserClasses(action.data.userClasses)); 
        if(action.data.userDecks) {
            yield put(refreshUserDecks(action.data.userDecks)); 
        }
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