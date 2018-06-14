import { createSelector } from 'reselect'; 

const selectAppContainerDomain = () => (state) => {
    return state.get('appContainer')
};


const makeSelectAppContainer = () => createSelector(
    selectAppContainerDomain(), 
    (substate) => {
        return substate.toJS();
    }
);

export default makeSelectAppContainer;