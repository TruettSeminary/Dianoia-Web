import { createSelector } from 'reselect'; 

import {
    allUserDecksSelector
} from 'collections/decks/selectors'; 

const homePageSelector = () => createSelector(
    [allUserDecksSelector], 
    (decks) => {
        return {
            decks
        }
    }
); 

export {
    homePageSelector
};