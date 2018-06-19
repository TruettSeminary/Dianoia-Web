import { createSelector } from 'reselect'; 

const getNotes = () => (state) => state.notes.toJS(); 

const allUserNotesSelector = createSelector(
    getNotes(), 
    (notes) => {
        if(notes.toJS) return notes.toJS(); 
        else return notes; 
    }
)

export {
    allUserNotesSelector
};