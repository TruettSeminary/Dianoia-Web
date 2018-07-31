import {
    ADD_OR_UPDATE_USER_NOTE,
    ADD_OR_UPDATE_USER_NOTE_SUCCESS
} from './constants'; 

export function addOrUpdateUserNote(note) {
    return {
        type: ADD_OR_UPDATE_USER_NOTE, 
        note
    }
}

export function addOrUpdateUserNoteSucceeded(note) {
    return {
        type: ADD_OR_UPDATE_USER_NOTE_SUCCESS, 
        note
    }
}
