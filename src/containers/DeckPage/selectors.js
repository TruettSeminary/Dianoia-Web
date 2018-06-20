import { createSelector } from 'reselect'; 

import {
    userDecksPopulatedSelector
} from 'collections/user/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

const deckPageSelector = () => createSelector(
    [userDecksPopulatedSelector, allCardsSelector], 
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