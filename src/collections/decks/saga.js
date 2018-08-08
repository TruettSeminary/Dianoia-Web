import { fork, put, takeLatest } from 'redux-saga/effects'; 

import Dianoia from 'utils/API/index';

import {
    GET_ALL_USER_DECKS,
    ADD_DECK_TO_USER,
    ADD_DECK_TO_USER_SUCCESS,
    REMOVE_DECK_FROM_USER,
    REMOVE_DECK_FROM_USER_SUCCESS
} from './constants'; 

import {
    getAllUserDecks,
    refreshAllUserDecks,
    addDeckToUserSucceeded, 
    removeDeckFromUserSucceeded
} from './actions'; 

import {
    refreshUserDecks
} from 'collections/user/actions'; 

import  {
    getAllCards
} from 'collections/cards/actions'; 

import {
    getAllTranslations
} from 'collections/translations/actions'; 

export function* getAllUserDecksSaga(action) {
    try {
        const response = yield Dianoia.getAllDecks(); 
        if(Array.isArray(response)) {
            yield put(refreshAllUserDecks(response)); 
        }
    } catch(error) {

    }
}

export function* addDeckToUserSaga(action) {
    try {
        const response = yield Dianoia.addDeckToUser(action.data.user, action.data.deck_id);
        if(Array.isArray(response.decks)) {
            yield put(addDeckToUserSucceeded(response.decks));
        }
    } catch(error) {

    }
}

export function* removeDeckFromUserSaga(action) {
    try {
        // get current user
        const response = yield Dianoia.removeDeckFromUser(action.data.user, action.data.deck_id); 

        if(Array.isArray(response.decks)) {
            // success
            yield put(removeDeckFromUserSucceeded(response.decks)); 
        }
    } catch(error) {
        // TODO: handle error
        console.log(error); 
    }
}

// action.data.userDecks --> decks that belong to the current user
export function* deckModificationSuccessSaga(action) {
    try {
        // Update the user state
        yield put(refreshUserDecks(action.data.userDecks));

        // update the decks state
        yield put(getAllUserDecks());  

        yield put(getAllCards()); 
        yield put(getAllTranslations());
    } catch(error) {
        // Silent
    }
}

export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_USER_DECKS, getAllUserDecksSaga);

    yield fork(takeLatest, ADD_DECK_TO_USER, addDeckToUserSaga); 
    yield fork(takeLatest, REMOVE_DECK_FROM_USER, removeDeckFromUserSaga); 

    // TODO: watch out for this in case network is slow (and somehow an out of date version of the userDecks is saved)
    yield fork(takeLatest, ADD_DECK_TO_USER_SUCCESS, deckModificationSuccessSaga); 
    yield fork(takeLatest, REMOVE_DECK_FROM_USER_SUCCESS, deckModificationSuccessSaga);
}