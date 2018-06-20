import { fromJS } from 'immutable'; 

import {
    REFRESH_ALL_CARDS
} from './constants'; 

const cards = []; 

const initialState = fromJS(cards); 

function cardsReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_ALL_CARDS: 
            return fromJS(action.data.cards); 
        default: 
            return state; 
    }
}

export default cardsReducer; 