import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES_NAMES } from '../../constants/routes';
import { RootState } from '../../redux/redux-store';
import { PasswordRecovery } from '../password-recovery';
import { PasswordReset } from '../password-reset';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export const PswForgot = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const query = useQuery();

  return isAuth ? (
    <Navigate to={`${ROUTES_NAMES.ALL_BOOKS}`} />
  ) : query.get('code') ? (
    <PasswordReset />
  ) : (
    <PasswordRecovery />
  );
};
