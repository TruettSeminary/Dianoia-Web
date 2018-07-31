import { createSelector } from 'reselect'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

const cardDetailsSelector = () => createSelector(
    [allCardsSelector], 
    (cards) => {
        return {
            cards
        }
    }
); 

export {
    cardDetailsSelector
};