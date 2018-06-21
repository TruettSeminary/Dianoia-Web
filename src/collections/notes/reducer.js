import { fromJS } from 'immutable'; 

import {
    REFRESH_ALL_USER_NOTES, 
    ADD_NEW_NOTE_SUCCESS, 
    UPDATE_USER_NOTE_SUCCESS,
    RESET_NOTES
} from './constants'; 

const notes = []; 

const initialState = fromJS(notes); 

function notesReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_ALL_USER_NOTES: 
            return fromJS(action.data.notes); 
        case ADD_NEW_NOTE_SUCCESS:
            return state.push(action.data.note); 
        case UPDATE_USER_NOTE_SUCCESS: 
            const notes = state.toJS(); 
            return fromJS(notes.map((note) => {
                if(note._id === action.data.note._id) {
                    return action.data.note; 
                }
                else return note; 
             })); 
        case RESET_NOTES: 
             return initialState; 
        default: 
            return state; 
    }
}

export default notesReducer; 