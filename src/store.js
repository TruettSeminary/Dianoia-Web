import { createStore, applyMiddleware, compose } from 'redux'; 
import { fromJS } from 'immutable'; 
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'; 
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
      applyMiddleware(...middlewares)
  ];

  const composeEnhancers = 
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
        name: `Dianoia`,
        })
        : compose;


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
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store; 

}