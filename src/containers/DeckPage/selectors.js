import { createSelector } from 'reselect'; 

import {
    userDecksMappedSelector
} from 'collections/user/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

const deckPageSelector = () => createSelector(
    [userDecksMappedSelector, allCardsSelector], 
    (decks, cards) => {
        return {
            decks,
            cards
        }
    }
); 

export {
    deckPageSelector
};