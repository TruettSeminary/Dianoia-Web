import { fork, put, takeLatest } from 'redux-saga/effects'; 

import Dianoia from 'utils/API/index'; 

import {
    GET_ALL_TRANSLATIONS
} from './constants'; 

import {
    refreshAllTranslations
} from './actions';

export function* getAllTranslationsSaga(action) {
    try {
        const translations = yield Dianoia.getAllTranslations(); 
        yield put(refreshAllTranslations(translations)); 
    } catch(error) {
        console.error(error); 
    }

}

export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_TRANSLATIONS, getAllTranslationsSaga); 
}