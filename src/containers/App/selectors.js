import { createSelector } from 'reselect'; 

const selectAppContainerDomain = () => (state) => state.get('appContainer');

const makeSelectAppContainer = () => createSelector(
    selectAppContainerDomain(), 
    (substate) => substate.toJS()
);

export default makeSelectAppContainer;