import { createSelector } from 'reselect'; 

import {
    userBasicInfoSelector, 
    userClassesSelector, 
    userDecksSelector
} from 'collections/user/selectors'; 

import {
    allClassesSelector
} from 'collections/classes/selectors'


const classesPageSelector = () => createSelector(
    [userBasicInfoSelector, userClassesSelector, userDecksSelector, allClassesSelector], 
    (userInfo, userClasses, userDecks, classes) => {
        return {
            user: {
                ...userInfo, 
                classes: userClasses, 
                decks: userDecks
            },
            classes 
        }
    }
);

export {
    classesPageSelector
};