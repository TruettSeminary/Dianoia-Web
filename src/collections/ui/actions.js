import {
    OPEN_LOGIN_MODAL,
    CLOSE_LOGIN_MODAL
} from './constants';

export function openLoginModal() {
    return {
        type: OPEN_LOGIN_MODAL
    }
}

export function closeLoginModal() {
    return {
        type: CLOSE_LOGIN_MODAL
    }
}