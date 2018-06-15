import { createSelector } from 'reselect'; 
import { userBasicInfoSelector } from 'collections/user/selectors'; 
import { allUserDecksSelector } from 'collections/decks/selectors'; 

const toolbarSelector = () => createSelector(
    [userBasicInfoSelector], 
    (userBasicInfo) => {
        return {
            user: {
                ...userBasicInfo
            }
        }
    }
);

const headerLinkSelector = () => createSelector(
    [userBasicInfoSelector, allUserDecksSelector], 
    (userBasicInfo, userDecks, classes) => {
        return {
            user: {
                ...userBasicInfo, 
                decks: userDecks
            }
        }
    }
); 

export {
    toolbarSelector, 
    headerLinkSelector
}; 