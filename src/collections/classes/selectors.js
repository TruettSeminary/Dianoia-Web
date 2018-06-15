import { createSelector } from 'reselect'; 

const getClasses = () => (state) => state.classes.toJS();

const allClassesSelector = createSelector(
    getClasses(), 
    (classes) => {
        if(classes.toJS) return classes.toJS(); 
        else return classes; 
    }
)

export {
    allClassesSelector
}; 