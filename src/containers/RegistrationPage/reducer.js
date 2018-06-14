import { fromJS } from 'immutable';


const initialState = fromJS({}); 

function registrationReducer(state = initialState, action) {
    switch(action.type) {
        default: 
            return state; 
            
    }
}

export default registrationReducer; 