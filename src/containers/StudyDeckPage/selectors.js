import { createSelector } from 'reselect'; 

import {
    userDecksPopulatedSelector
} from 'collections/user/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

import {
    allUserNotesMappedToCardsSelector
} from 'collections/notes/selectors'

const studyDeckPageSelector = () => createSelector(
    [userDecksPopulatedSelector, allCardsSelector, allUserNotesMappedToCardsSelector], 
    (decks, cards, notes) => {
        return {
            decks,
            notes, 
            cards: cards.map((card) => {
                const note = notes[card._id];
                if(note) {
                    card.note = note; 
                }
                return card; 
            })
        }
    }
); 

export {
    studyDeckPageSelector
};