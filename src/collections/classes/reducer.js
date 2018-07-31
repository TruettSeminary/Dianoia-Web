import { fromJS } from 'immutable';

import {
    REFRESH_CLASSES, RESET_CLASSES
} from './constants';

const initialState = fromJS({}); 

// expects an array of class objects
// returns object with keys (of class id) mapped to class
const getClassMap = (classes) => {
    return classes.reduce((classMap, clazz) => {
        classMap[clazz._id] = clazz; 
        return classMap; 
    }, {}); 
}; 

function classesReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_CLASSES:
            return fromJS(getClassMap(action.data.classes));
        case RESET_CLASSES: 
            return initialState; 
        default:
            return state; 
    }
}

export default classesReducer;