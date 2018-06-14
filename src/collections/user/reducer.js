import { fromJS } from 'immutable'; 
import auth from 'utils/auth'; 

import {
    LOGOUT_SUCCESS,
    REFRESH_USER, 
    REFRESH_USER_CLASSES, 
    REFRESH_USER_DECKS
} from './constants';

// TODO: figure out how to hydrate user and current state from cache

const cachedJWT = auth.getToken(); 

const user = {
    _id: '', 
    email: '', 
    first_name: '', 
    last_name: '',
    classes: [],
    decks: [],
    notes: [],
    settings: {},
    jwt: cachedJWT ? cachedJWT : '',
    ...auth.getUserInfo()
}

const initialState = fromJS(user); 


function userReducer(state = initialState, action) {
    switch(action.type) {
        case LOGOUT_SUCCESS: 
            return initialState.set({jwt: ''}); 
        case REFRESH_USER: 
            return state.mergeDeep(action.user); 
        case REFRESH_USER_CLASSES: 
            // todo: determine if this is the right way to handle this
            return state.set('classes', action.userClasses); 
        case REFRESH_USER_DECKS:
            return state.set('decks', action.userDecks);
        default: 
            return state; 
      }
}

export default userReducer; 