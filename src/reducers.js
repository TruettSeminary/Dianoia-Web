import { combineReducers } from 'redux-immutable'; 
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'connected-react-router';

// Custom Reducers
import user from 'collections/user/reducer';
import classes from 'collections/classes/reducer'; 
import notificationProvider from 'containers/NotificationProvider/reducer'; 



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


export default function createReducer() {
    return combineReducers({
        router,
        user,
        classes,
        notificationProvider
    }); 
}