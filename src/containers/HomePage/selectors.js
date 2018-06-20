import { createSelector } from 'reselect'; 

import {
    userDecksPopulatedSelector
} from 'collections/user/selectors'; 

const homePageSelector = () => createSelector(
    [userDecksPopulatedSelector], 
    (decks) => {
        return {
            decks
        }
    }
); 

export {
    homePageSelector
};