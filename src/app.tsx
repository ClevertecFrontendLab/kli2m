import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Loader } from './components/loader';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants/routes';
import { AuthPage } from './pages/auth/auth';
import { WrapperPage } from './pages/wrapper/wrapper-page';
import { store } from './redux/redux-store';

import './index.scss';

export const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Loader />
        {store.getState().auth.isAuth ? (
          <WrapperPage
            child={
              <Routes>
                {PRIVATE_ROUTES.map((router, ind) => (
                  <Route key={`${router.path} ${ind + 1}`} path={router.path} element={<router.component />} />
                ))}
              </Routes>
            }
          />
        ) : (
          <AuthPage
            child={
              <Routes>
                {PUBLIC_ROUTES.map((router, ind) => (
                  <Route key={`${router.path} ${ind + 1}`} path={router.path} element={<router.component />} />
                ))}
              </Routes>
            }
          />
        )}
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
