import { createSelector } from 'reselect'; 

const getDecks = () => (state) => state.decks.toJS();

const allUserDecksSelector = createSelector(
    getDecks(), 
    (decks) => {
        if(decks.toJS) return decks.toJS(); 
        else return decks; 
    }
)

export {
    allUserDecksSelector
}; 