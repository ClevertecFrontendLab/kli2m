import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../constants/routes';
import { AuthPage } from '../../pages/auth';
import { WrapperPage } from '../../pages/wrapper';
import { RootState } from '../../redux/redux-store';

export const PrivateRoute: React.FC = (): JSX.Element => {
  const isAuth = useSelector((state: RootState) => !!state.auth.isAuth);
  const jwt = useSelector((state: RootState) => !!state.auth.user?.jwt);

  return isAuth && jwt ? (
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
  );
};
