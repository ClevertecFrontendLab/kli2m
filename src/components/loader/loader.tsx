import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Lottie from 'lottie-react';

import loaderAnimation from '../../assets/data/loader.json';
import { RootState } from '../../redux/redux-store';

import './loader.scss';

export const Loader: React.FC = () => {
  const status = useSelector((state: RootState) => state.books.status);
  const regStatus = useSelector((state: RootState) => state.reg.status);

  return (
    <section data-test-id='loader' className={classNames('loader', status, regStatus)}>
      <Lottie animationData={loaderAnimation} loop={true} />
    </section>
  );
};
