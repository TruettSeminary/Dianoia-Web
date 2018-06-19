import { fork, put, takeLatest } from 'redux-saga/effects'; 
// import { delay } from 'redux-saga'

import Dianoia from 'utils/API/index';

import {
    GET_ALL_USER_NOTES,
    ADD_NEW_USER_NOTE,
    UPDATE_USER_NOTE
} from './constants'; 

import {
    refreshAllUserNotes, 
    addUserNoteSucceeded,
    updateUserNoteSucceeded
} from './actions'; 

export function* getAllUserNotesSaga(action) {
    try {
        const response = yield Dianoia.getAllNotes(); 
        if(Array.isArray(response)) {
            yield put(refreshAllUserNotes(response)); 
        }
    } catch(error) {
        console.error(error); 
    }
}

export function* addUserNoteSaga(action) {
    try {
        const note = yield Dianoia.addUserNote(action.data.note); 
        if(note) {
            yield put(addUserNoteSucceeded(note)); 
        }

    } catch(error) {
        console.error(error); 
    }
}

export function* updateUserNoteSaga(action) {
    try {

        // if(action.delay) yield delay(action.delay); 

        const newNote = {
            note_id: action.data._id
        }; 

        if(action.data.note !== null) newNote.note = action.data.note; 
        if(action.data.card_score !== null) newNote.card_score = action.data.card_score;
        if(action.data.view_status !== null) newNote.view_status = action.data.view_status;

        const note = yield Dianoia.updateUserNote(newNote);
        if(note) {
            yield put(updateUserNoteSucceeded(note)); 
        }
    } catch(error) {
        console.error(error); 
    }
}

export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_USER_NOTES, getAllUserNotesSaga); 
    yield fork(takeLatest, ADD_NEW_USER_NOTE, addUserNoteSaga); 
    yield fork(takeLatest, UPDATE_USER_NOTE, updateUserNoteSaga); 
}