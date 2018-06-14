import { combineReducers } from 'redux-immutable'; 
import appContainer from 'containers/App/reducer'; 
import registrationPage from 'containers/RegistrationPage/reducer'; 
import notificationProvider from 'containers/NotificationProvider/reducer'; 
import classesPage from 'containers/ClassesPage/reducer'; 

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'connected-react-router';

// Initial routing state
const routeInitialState = fromJS({
    location: null,
  });
  
/**
 * Merge route into the global application state
 */
function router(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}


export default function createReducer(injectedReducers) {
    return combineReducers({
        router,
        appContainer,
        registrationPage,
        classesPage,
        notificationProvider,
        ...injectedReducers
    }); 
}