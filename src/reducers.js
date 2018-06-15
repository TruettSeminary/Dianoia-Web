import { combineReducers } from 'redux'; 

// Custom Reducers
import user from 'collections/user/reducer';
import classes from 'collections/classes/reducer'; 
import decks from 'collections/decks/reducer'; 
import notificationProvider from 'containers/NotificationProvider/reducer'; 


export default function createReducer() {
    return combineReducers({
        user,
        classes,
        decks, 
        notificationProvider
    }); 
}