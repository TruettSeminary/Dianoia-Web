import { createSelector } from 'reselect'; 

import {
    allTranslationsSelector
} from 'collections/translations/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

const translationPageSelector = () => createSelector(
    [allTranslationsSelector, allCardsSelector], 
    (translations, cards) => {
        return {
            translations,
            cards
        }
    }
); 

export {
    translationPageSelector
}