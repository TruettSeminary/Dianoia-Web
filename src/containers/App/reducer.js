import { fromJS } from 'immutable'; 
import auth from 'utils/auth'; 

import {
    LOGOUT_SUCCESS,
    REFRESH_USER
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

function appContainerReducer(state = initialState, action) {
  switch(action.type) {
    case LOGOUT_SUCCESS: 
        return state.set('user', action.user); 
    case REFRESH_USER: 
        return state.set('user', action.user); 
    default: 
        return state; 
  }
}
  
export default appContainerReducer;