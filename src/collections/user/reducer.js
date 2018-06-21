import { fromJS } from 'immutable';

import {
    REFRESH_USER, 
    REFRESH_USER_CLASSES, 
    REFRESH_USER_DECKS, 
    RESET_USER
} from './constants';

// TODO: figure out how to hydrate user and current state from cache

const user = {
    _id: '', 
    email: '', 
    first_name: '', 
    last_name: '',
    classes: [],
    decks: [],
    notes: [],
    settings: {},
    jwt: ''
}

const initialState = fromJS(user); 


function userReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_USER: 
            return state.mergeDeep(action.user); 
        case REFRESH_USER_CLASSES: 
            // todo: determine if this is the right way to handle this
            return state.set('classes', fromJS(action.userClasses)); 
        case REFRESH_USER_DECKS:
            return state.set('decks', fromJS(action.userDecks));
        case RESET_USER: 
            return initialState; 
        default: 
            return state; 
      }
}

export default userReducer; 