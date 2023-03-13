import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { ROUTES_NAMES } from '../../constants/routes';
import { RootState } from '../../redux/redux-store';

export const WrongPage = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return isAuth ? <Navigate to={`${ROUTES_NAMES.ALL_BOOKS}`} /> : <Navigate to={`${ROUTES_NAMES.AUTH}`} />;
};
