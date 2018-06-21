import { fromJS } from 'immutable'; 

import {
    OPEN_LOGIN_MODAL, 
    CLOSE_LOGIN_MODAL
} from './constants';

const ui = {
    displayLoginModal: false
}; 

const initialState = fromJS(ui); 

function uiReducer(state = initialState, action) {
    switch(action.type) {
        case OPEN_LOGIN_MODAL: 
            return state.set('displayLoginModal', true); 
        case CLOSE_LOGIN_MODAL: 
            return state.set('displayLoginModal', false); 
        default: 
            return state;
    }
}

export default uiReducer;