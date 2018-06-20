import { createSelector } from 'reselect'; 

import {
    allDecksMapSelector
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

const userDecksSelector = createSelector(
    getUser(), 
    (user) => {
        return user.decks;
    }
)

const userDecksPopulatedSelector = createSelector(
    [allDecksMapSelector, userDecksSelector], 
    (allDecks, userDecks) => {
        return userDecks.map((deck)=> {
            return allDecks[deck]; 
        });
    }
); 

export {
    userBasicInfoSelector,
    userClassesSelector, 
    userDecksSelector, 
    userDecksPopulatedSelector
}; 