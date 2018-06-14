import { fromJS } from 'immutable';

import {
    REFRESH_CLASSES
} from './constants';

const initialState = fromJS({
    classes: []
}); 

function classesPageReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_CLASSES:
            return state.set('classes', action.data.classes); 
        default:
            return state; 
    }
}

export default classesPageReducer; 