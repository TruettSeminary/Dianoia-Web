import { createSelector } from 'reselect'; 
import { 
    userBasicInfoSelector,
    userDecksPopulatedSelector 
} from 'collections/user/selectors'; 

import { sideMenuUI } from 'collections/ui/selectors';

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


const sideMenuSelector = () => createSelector(
    [sideMenuUI],
    (sideMenuUI) => sideMenuUI
);

export {
    toolbarSelector, 
    headerLinkSelector, 
    sideMenuSelector
}; 