import { createSelector } from 'reselect'; 

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

export {
    userBasicInfoSelector,
    userClassesSelector, 
    userDecksSelector
}; 