import { createSelector } from 'reselect'; 

import {
    allUserDecksSelector
} from 'collections/decks/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

const deckPageSelector = () => createSelector(
    [allUserDecksSelector, allCardsSelector], 
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