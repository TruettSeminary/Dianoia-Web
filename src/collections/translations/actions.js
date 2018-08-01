import { 
    GET_ALL_TRANSLATIONS, 
    REFRESH_ALL_TRANSLATIONS,
    RESET_TRANSLATIONS 
} from "./constants";


export function getAllTranslations() {
    return {
        type: GET_ALL_TRANSLATIONS
    }
}

export function refreshAllTranslations(translations) {
    return {
        type: REFRESH_ALL_TRANSLATIONS, 
        translations
    }
}

export function resetTranslations() {
    return {
        type: RESET_TRANSLATIONS
    }
}