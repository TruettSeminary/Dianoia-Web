import { createSelector } from 'reselect'; 

import {
    userDecksMappedSelector
} from 'collections/user/selectors'; 

import {
    allTranslationsSelector
} from 'collections/translations/selectors'; 

const translationDeckPageSelector = () => createSelector(
    [userDecksMappedSelector, allTranslationsSelector], 
    (decks, translations) => {
        return {
            decks, 
            translations
        }
    }
); 

export {
    translationDeckPageSelector
}