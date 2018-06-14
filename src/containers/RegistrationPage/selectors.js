import { createSelector } from 'reselect'; 

const selectRegistrationPageDomain = () => (state) => state.get('registrationPage');

const makeSelectRegistrationPage = () => createSelector(
    selectRegistrationPageDomain(), 
    (substate) => substate.toJS()
);

export default makeSelectRegistrationPage;