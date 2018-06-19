import { createSelector } from 'reselect'; 

import {
    allCardsSelector
} from 'collections/cards/selectors';

import {
    allUserNotesSelector
} from 'collections/notes/selectors'; 

const cardPageSelector = () => createSelector(
    [allCardsSelector, allUserNotesSelector], 
    (cards, notes) => {
        return {
            cards, 
            notes
        }
    }
); 

export {
    cardPageSelector
};