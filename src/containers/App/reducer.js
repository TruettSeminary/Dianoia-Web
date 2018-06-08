import { fromJS } from 'immutable'; 
import auth from 'utils/auth'; 

import {
    LOGIN_SUBMIT_FAIL,
    LOGIN_SUBMIT_SUCCESS,
    LOGOUT_SUCCESS,
    SET_ERRORS, 
    DISPLAY_LOGIN,
    HIDE_LOGIN,
    REQUEST_REGISTRATION, 
    REQUEST_FORGOT_PASSWORD
} from './constants';

// load from storage
const jwt = auth.getToken(); 
const user = {
    ...auth.getUserInfo(), 
    jwt
}

const initialState = fromJS({
  user, 
  displayLogin: false
}); 

function appReducer(state = initialState, action) {
  switch(action.type) {
    case DISPLAY_LOGIN:
        return state.set('displayLogin', action.value); 
    case HIDE_LOGIN: 
        return state.set('displayLogin', action.value); 
    case LOGIN_SUBMIT_SUCCESS: 
        return state
            .set('user', action.user)
            .set('submitSuccess', true); 
    case LOGIN_SUBMIT_FAIL: 
        return state.set('submitSuccess', false); 
    case LOGOUT_SUCCESS: 
        return state.set('user', action.user); 
    default: 
        return state; 
  }
}
  
export default appReducer;