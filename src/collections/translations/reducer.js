import { fromJS } from 'immutable'; 

import {
    REFRESH_ALL_TRANSLATIONS,
    RESET_TRANSLATIONS
} from './constants'; 

const initialState = fromJS({}); 

function getTranslationMap(translations) {
    return translations.reduce((translationMap, translation) => {
        translationMap[translation._id] = translation;
        return translationMap;
    }, {}); 
}

function translationsReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_ALL_TRANSLATIONS: 
            return fromJS(getTranslationMap(action.translations)); 
        case RESET_TRANSLATIONS: 
            return initialState; 
        default: 
            return state; 
    }
}

export default translationsReducer; 