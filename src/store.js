import { createStore, applyMiddleware } from 'redux'; 
import Immutable, { fromJS } from 'immutable'; 
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'; 
import createReducer from './reducers'; 

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

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; 
  store.injectedSagas = {}; 

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(connectRouter(history)(createReducer(store.injectedReducers)));
    });
  }

  return store; 

}