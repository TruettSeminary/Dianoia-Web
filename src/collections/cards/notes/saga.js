import { fork, put, takeEvery } from 'redux-saga/effects'; 
// import { delay } from 'redux-saga'

import Dianoia from 'utils/API/index';

import {
    ADD_OR_UPDATE_USER_NOTE
} from './constants'; 

import {
    addOrUpdateUserNoteSucceeded
} from './actions'; 


export function* addOrUpdateUserNoteSaga(action) {
    try {
        const note = yield Dianoia.addOrUpdateUserNote(action.note); 
        if(note) {
            yield put(addOrUpdateUserNoteSucceeded(note)); 
        }

    } catch(error) {
        console.error(error); 
    }
}

export default function* defaultSaga() {
    yield fork(takeEvery, ADD_OR_UPDATE_USER_NOTE, addOrUpdateUserNoteSaga); 
}