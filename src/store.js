import { createStore, applyMiddleware } from 'redux'; 
import Immutable, { fromJS } from 'immutable'; 
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'; 
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga'; 
import createReducer from './reducers'; 
import { sagas } from './sagas'; 

const sagaMiddleware = createSagaMiddleware(); 

export default function configureStore(intitialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
      sagaMiddleware, 
      routerMiddleware(history)
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // Set up compose with Redux Devtools
  const composeEnhancers = composeWithDevTools({
    name: 'Dianoia', 
    serialize: {
      immutable: Immutable
    }
  });  

  const store = createStore(
    connectRouter(history)(createReducer()), 
    fromJS(intitialState), 
    composeEnhancers(...enhancers)
  );

  // Start each saga
  sagas.forEach((saga) => {
    sagaMiddleware.run(saga); 
  }); 

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(connectRouter(history)(createReducer()));
    });
  }

  return store; 

}