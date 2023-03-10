import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { Loader } from './components/loader';
import { PrivateRoute } from './components/private-route/private-route';
import { store } from './redux/redux-store';

import './index.scss';

export const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Loader />
        <PrivateRoute />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
