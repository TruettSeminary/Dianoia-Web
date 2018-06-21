import {
    GET_ALL_USER_NOTES, 
    REFRESH_ALL_USER_NOTES,
    ADD_NEW_USER_NOTE, 
    ADD_NEW_NOTE_SUCCESS, 
    UPDATE_USER_NOTE, 
    UPDATE_USER_NOTE_SUCCESS,
    RESET_NOTES
} from './constants'; 

export function getAllUserNotes() {
    return {
        type: GET_ALL_USER_NOTES
    }
}

export function refreshAllUserNotes(notes) {
    return {
        type: REFRESH_ALL_USER_NOTES,
        data: {
            notes
        }
    }
}

export function addUserNote(note) {
    return {
        type: ADD_NEW_USER_NOTE, 
        data: {
            note
        }
    }
}

export function addUserNoteSucceeded(note) {
    return {
        type: ADD_NEW_NOTE_SUCCESS, 
        data: {
            note
        }
    }
}

export function updateUserNote(note) {
    return {
        type: UPDATE_USER_NOTE, 
        data: {
            ...note
        }
    }
}

export function updateUserNoteWithDelay(note, delay) {
    return {
        type: UPDATE_USER_NOTE,
        delay, 
        data: {
            ...note
        }
    }
}

export function updateUserNoteSucceeded(note) {
    return {
        type: UPDATE_USER_NOTE_SUCCESS, 
        data: {
            note
        }
    }
}

export function resetNotes() {
    return {
        type: RESET_NOTES
    }
}