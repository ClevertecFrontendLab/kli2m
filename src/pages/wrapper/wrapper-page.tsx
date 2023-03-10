import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';
import { Message } from '../../components/message';
import { fetchCategories } from '../../redux/reducers/books-reducer';
import { toggleOpenMenu } from '../../redux/reducers/menu-reducer';
import { toggleDescending } from '../../redux/reducers/navigation-reducer';
import { RootState } from '../../redux/redux-store';

import './wrapper-page.scss';

export const WrapperPage: React.FC<{ child: ReactNode }> = ({ child }): JSX.Element => {
  const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
  const status = useSelector((state: RootState) => state.books.status);
  const jwt = useSelector((state: RootState) => state.auth.user?.jwt);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (jwt && isAuth) dispatch(fetchCategories(jwt)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, isAuth]);

  useEffect(() => {
    if (status === 'idle' && isAuth) dispatch(toggleDescending(false)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isAuth]);

  const onHandleWrapper = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isMenuOpen) dispatch(toggleOpenMenu(false));
  };

  return (
    <section
      role='button'
      onKeyPress={() => {}}
      tabIndex={0}
      className={classNames('wrapper-page', status)}
      onClick={onHandleWrapper}
    >
      <Header />
      <div className='wrapper-page__content'>
        <Message />
        {child}
      </div>
      <Footer />
    </section>
  );
};
