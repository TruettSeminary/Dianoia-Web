// import './public-path'; // TODO: evaluate

import { Provider } from 'react-redux'; 
import React from 'react'; 
import ReactDom from 'react-dom'; 
import { ConnectedRouter } from "react-router-redux";
import createHistory from 'history/createBrowserHistory'; 

import 'sanitize.css/sanitize.css'; 
import 'whatwg-fetch'; 

// import './index.css';
import registerServiceWorker from './registerServiceWorker';

// TODO: watch out for problems with the path here
import App from 'containers/App'; 
// import {} from 'containers/App/Actions'; 

import configureStore from './store'; 

// Create redux store with history
const basename = window.location.origin; //
const history = createHistory({
  basename
}); 

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
      {/* TODO: Add language provider here */}
        <App />
      </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
  );
}; 

registerServiceWorker();

