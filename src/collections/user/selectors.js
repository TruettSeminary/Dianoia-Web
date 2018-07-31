import { createSelector } from 'reselect'; 

import {
    allDecksSelector
} from 'collections/decks/selectors'; 

const getUser = () => (state) => state.user.toJS(); 

const userBasicInfoSelector = createSelector(
    getUser(), 
    (user) => {
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            _id: user._id,
            jwt: user.jwt
        }
    }
); 

const userClassesSelector = createSelector(
    getUser(), 
    (user) => {
        return user.classes;
    }
); 

// Returns array of deck id's user is subscribed to
const userDecksSelector = createSelector(
    getUser(), 
    (user) => {
        return user.decks;
    }
)

// returns an object of deck id's mapped to decks 
// the user is subscribed to
const userDecksPopulatedSelector = createSelector(
    [allDecksSelector, userDecksSelector], 
    (allDecks, userDecks) => {
        // Decks have not been populated yet
        if(!Object.keys(allDecks).length) return []; 

        return userDecks.map((deck)=> {
            return allDecks[deck]; 
        });
    }
); 

// TODO: eventually move everything to this version of user decks
const userDecksMappedSelector = createSelector(
    [allDecksSelector, userDecksSelector], 
    (allDecks, userDecks) => {

        return userDecks.reduce((decks, deck_id)=> {
            decks[deck_id] = allDecks[deck_id]; 
            return decks; 
        }, {});
    }
);

export {
    userBasicInfoSelector,
    userClassesSelector, 
    userDecksSelector, 
    userDecksPopulatedSelector,
    userDecksMappedSelector
}; 