import { createSelector } from 'reselect'; 

const getNotes = () => (state) => state.notes.toJS(); 

const allUserNotesSelector = createSelector(
    getNotes(), 
    (notes) => {
        if(notes.toJS) return notes.toJS(); 
        else return notes; 
    }
)

const allUserNotesMappedToCardsSelector = createSelector(
    getNotes(), 
    (stateNotes) => {
        let notes = stateNotes; 
        if(stateNotes.toJS) notes = stateNotes.toJS(); 

        return notes.reduce((newNotes, note) => {
            newNotes[note.card] = note; 
            return newNotes; 
        }, {})
        
    }
)

export {
    allUserNotesSelector,
    allUserNotesMappedToCardsSelector
};