import { createSelector } from 'reselect'; 
import { 
    userBasicInfoSelector,
    userDecksPopulatedSelector 
} from 'collections/user/selectors'; 

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
    [userBasicInfoSelector, userDecksPopulatedSelector], 
    (userBasicInfo, decks) => {
        return {
            user: {
                ...userBasicInfo, 
                decks
            }
        }
    }
); 

export {
    toolbarSelector, 
    headerLinkSelector
}; 