import { createSelector } from 'reselect'; 

const selectClassesPageDomain = () => (state) => {
    return state.get('classesPage')
};


const makeSelectClassesPage= () => createSelector(
    selectClassesPageDomain(), 
    (substate) => {
        return substate.toJS();
    }
);

export default makeSelectClassesPage;