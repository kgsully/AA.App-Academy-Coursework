import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// BrowserRouter from React Router used for routing and Provider from redux to provide the attached Redux store to the React appliaction
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// Import configureStore to attach the Redux store to the React appliaction
import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

// Root functional component defined to wrap the App functional component in Redux's Provider and ReactRouter DOM's BrowserRouter provider components
// Ensure the store is passed into the Provider with a key of store
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
