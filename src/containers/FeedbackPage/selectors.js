import { createSelector } from 'reselect'; 

import { userBasicInfoSelector } from 'collections/user/selectors'; 

const feedbackSelector = () => createSelector(
    [userBasicInfoSelector], 
    (user) => {
        return { user }
    }
)

export {
    feedbackSelector
}