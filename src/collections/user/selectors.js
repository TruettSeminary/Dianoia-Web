import { createSelector } from 'reselect'; 

const getUser = () => (state) => state.get('user'); 

const userBasicInfoSelector = createSelector(
    getUser(), 
    (userInfo) => {
        return {
            first_name: userInfo.get('first_name'), 
            last_name: userInfo.get('last_name'),
            jwt: userInfo.get('jwt')
        }
    }
); 

const userClassesSelector = createSelector(
    getUser(), 
    (userClasses) => userClasses.toJS()
); 

const userDecksSelector = createSelector(
    getUser(), 
    (userDecks) => userDecks.toJS()
)

export {
    userBasicInfoSelector,
    userClassesSelector, 
    userDecksSelector
}; 