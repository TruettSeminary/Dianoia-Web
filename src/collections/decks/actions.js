import {
    ADD_DECK_TO_USER, 
    REMOVE_DECK_FROM_USER,
    ADD_DECK_TO_USER_SUCCESS,
    REMOVE_DECK_FROM_USER_SUCCESS,
    GET_ALL_USER_DECKS,
    REFRESH_ALL_USER_DECKS
} from './constants';

export function getAllUserDecks() {
    return {
        type: GET_ALL_USER_DECKS
    }
}

export function addDeckToUser(user, deck_id) {
    return {
        type: ADD_DECK_TO_USER, 
        data: {
            user, 
            deck_id
        }
    }
}

export function addDeckToUserSucceeded(userDecks) {
    return {
        type: ADD_DECK_TO_USER_SUCCESS, 
        data: {
            userDecks
        }
    }
}


export function removeDeckFromUser(user, deck_id) {
    return {
        type: REMOVE_DECK_FROM_USER, 
        data: {
            user, 
            deck_id
        }
    }
}

export function removeDeckFromUserSucceeded(userDecks) {
    return {
        type: REMOVE_DECK_FROM_USER_SUCCESS, 
        data: {
            userDecks
        }
    }
}

export function refreshAllUserDecks(decks) {
    return {
        type: REFRESH_ALL_USER_DECKS, 
        data: {
            decks
        }
    }
}