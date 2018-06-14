import { createSelector } from 'reselect'; 
import { userBasicInfoSelector } from 'collections/user/selectors'; 

const toolbarSelector = () => createSelector(
    userBasicInfoSelector, 
    (substate) => substate
);

export {
    toolbarSelector
}; 