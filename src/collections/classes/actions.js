import {
    GET_ALL_CLASSES, 
    ADD_CLASS_TO_USER, 
    REMOVE_CLASS_FROM_USER, 
    REFRESH_CLASSES,
    ADD_CLASS_TO_USER_SUCCESS, 
    REMOVE_CLASS_FROM_USER_SUCCESS,
    RESET_CLASSES
} from './constants';

export function getAllClasses() {
    return {
        type: GET_ALL_CLASSES
    };
}

export function addClassToUser(user, class_id) {
    return {
        type: ADD_CLASS_TO_USER, 
        data: {
            user,
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

export function removeClassFromUser(user, class_id) {
    return {
        type: REMOVE_CLASS_FROM_USER, 
        data: {
            user,
            class_id
        }
    }
}

export function removeClassFromUserSucceeded(userClasses, userDecks) {
    return {
        type: REMOVE_CLASS_FROM_USER_SUCCESS, 
        data: {
            userClasses, 
            userDecks
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

export function resetClasses() {
    return {
        type: RESET_CLASSES
    }
}