/* eslint-disable */
import { Provider } from 'react-redux'; 
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { ConnectedRouter } from "connected-react-router/immutable";
import createHistory from 'history/createBrowserHistory'; 

import 'sanitize.css/sanitize.css'; 
import 'whatwg-fetch'; 

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from 'containers/App'; 

import configureStore from './store'; 

// Create redux store with history
const basename = "/"
const history = createHistory({
  basename
});

// TODO: load hydrated data

const store = configureStore({}, history); 
/* eslint-enable */


ReactDOM.render(
    (<Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>), 
    document.getElementById('root')
);



registerServiceWorker();

const dispatch = store.dispatch; 
export {
    dispatch
};