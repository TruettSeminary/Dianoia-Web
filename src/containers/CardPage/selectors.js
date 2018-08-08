import { createSelector } from 'reselect'; 

import {
    allCardsSelector
} from 'collections/cards/selectors';

const cardPageSelector = () => createSelector(
    [allCardsSelector], 
    (cards) => {
        return {
            cards
        }
    }
); 

export {
    cardPageSelector
};