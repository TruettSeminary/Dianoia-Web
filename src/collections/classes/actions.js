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

export function addClassToUser(userClasses, class_id) {
    return {
        type: ADD_CLASS_TO_USER, 
        data: {
            userClasses,
            class_id
        }
    }
}

export function addClassToUserSucceeded(userClasses) {
    return {
        type: ADD_CLASS_TO_USER_SUCCESS, 
        data: {
            userClasses
        }
    }
}

export function removeClassFromUser(userClasses, class_id) {
    return {
        type: REMOVE_CLASS_FROM_USER, 
        data: {
            userClasses,
            class_id
        }
    }
}

export function removeClassFromUserSucceeded(userClasses) {
    return {
        type: REMOVE_CLASS_FROM_USER_SUCCESS, 
        data: {
            userClasses
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