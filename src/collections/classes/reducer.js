import { fromJS } from 'immutable';

import {
    REFRESH_CLASSES, RESET_CLASSES
} from './constants';

const classes = []; 

const initialState = fromJS(classes); 

function classesReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_CLASSES:
            return fromJS(action.data.classes);
        case RESET_CLASSES: 
            return initialState; 
        default:
            return state; 
    }
}

export default classesReducer;