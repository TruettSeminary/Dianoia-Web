import { createSelector } from 'reselect'; 

import {
    allUserDecksSelector
} from 'collections/decks/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

import {
    allUserNotesSelector
} from 'collections/notes/selectors'

const studyDeckPageSelector = () => createSelector(
    [allUserDecksSelector, allCardsSelector, allUserNotesSelector], 
    (decks, cards, notes) => {
        return {
            decks,
            cards: cards.reduce((newCards, card) => {
                newCards[card._id] = card; 
                return newCards; 
            }, {}), 
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