import { createSelector } from 'reselect'; 

import {
    userDecksPopulatedSelector
} from 'collections/user/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

import {
    allUserNotesSelector
} from 'collections/notes/selectors'

const studyDeckPageSelector = () => createSelector(
    [userDecksPopulatedSelector, allCardsSelector, allUserNotesSelector], 
    (decks, cards, notes) => {
        return {
            decks,
            cards, 
            notes: notes.reduce((newNotes, note) => {
                newNotes[note.card] = note; 
                return newNotes; 
            }, {})
        }
    }
); 

export {
    studyDeckPageSelector
};