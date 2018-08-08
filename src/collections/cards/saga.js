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
        const [cards, notes] = yield Promise.all([
            Dianoia.getAllCards(),
            Dianoia.getAllNotes()
        ]); 

        const noteMap = notes.reduce((map, note) => {
            map[note.card] = note; 
            return map; 
        }, {}); 

        const cardsWithNotes = cards.map((card) => {
            const note = noteMap[card._id]; 
            card.note = note || {}; 
            
            if(card.note.card === undefined) card.note.card = card._id; 
            if(card.note.card_score === undefined) card.note.card_score = 0; 
            if(card.note.note === undefined) card.note.note = ''; 

            return card; 
        }); 

        yield put(refreshAllCards(cardsWithNotes));
        
    } catch(error) {
        console.error(error); 
    }
}

export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_CARDS, getAllCardsSaga); 
}