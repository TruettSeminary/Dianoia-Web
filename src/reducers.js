import { combineReducers } from 'redux'; 

// Custom Reducers
import user from 'collections/user/reducer';
import classes from 'collections/classes/reducer'; 
import decks from 'collections/decks/reducer'; 
import cards from 'collections/cards/reducer';
import translations from 'collections/translations/reducer'; 

import notificationProvider from 'containers/NotificationProvider/reducer'; 
import ui from 'collections/ui/reducer'; 

export default function createReducer() {
    return combineReducers({
        user,
        classes,
        decks, 
        cards,
        translations,
        notificationProvider, 
        ui
    }); 
}