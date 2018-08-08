import { createSelector } from 'reselect'; 

import {
    userDecksMappedSelector
} from 'collections/user/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

const studyDeckPageSelector = () => createSelector(
    [userDecksMappedSelector, allCardsSelector], 
    (decks, cards) => {
        return {
            decks,
            cards
        }
    }
); 

export {
    studyDeckPageSelector
};