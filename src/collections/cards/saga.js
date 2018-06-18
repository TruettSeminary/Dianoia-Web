import { fork, put, takeLatest } from 'redux-saga/effects'; 

import Dianoia from 'utils/API/index'; 

import {
    GET_ALL_CARDS
} from './constants'; 

import {
    refreshAllCards
} from './actions'; 

export function* getAllCardsSaga(action) {
    try {
        const response = yield Dianoia.getAllCards(); 
        
        if(Array.isArray(response)) {
            yield put(refreshAllCards(response)); 
        }
    } catch(error) {

    }
}

export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_CARDS, getAllCardsSaga); 
}