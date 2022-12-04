import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./pages/Main";

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from "react-redux";
import store from './store/index';


let persistor = persistStore(store);

// const rootElement = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById("root");

document.title = 'Casalytica - analytics for on-chain content';

const renderApp = (App) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

serviceWorker.unregister();
