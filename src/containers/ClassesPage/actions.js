import {
    GET_ALL_CLASSES, 
    ADD_CLASS_TO_USER, 
    REMOVE_CLASS_FROM_USER, 
    REFRESH_CLASSES,
    ADD_CLASS_TO_USER_SUCCESS, 
    REMOVE_CLASS_FROM_USER_SUCCESS
} from './constants';

export function getAllClasses() {
    return {
        type: GET_ALL_CLASSES
    };
}

export function addClassToUser(class_id) {
    return {
        type: ADD_CLASS_TO_USER, 
        data: {
            class_id
        }
    }
}

export function addClassToUserSucceeded(classes) {
    return {
        type: ADD_CLASS_TO_USER_SUCCESS, 
        data: {
            classes
        }
    }
}

export function removeClassFromUser(class_id) {
    return {
        type: REMOVE_CLASS_FROM_USER, 
        data: {
            class_id
        }
    }
}

export function removeClassFromUserSucceeded(classes) {
    return {
        type: REMOVE_CLASS_FROM_USER_SUCCESS, 
        data: {
            classes
        }
    }
}

export function refreshClasses(classes) {
    return {
        type: REFRESH_CLASSES, 
        data: {
            classes
        }
    }
}