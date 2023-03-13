import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import avatar from '../../assets/img/header/avatar.png';
import logo from '../../assets/img/header/logo.png';
import { ROUTES_NAMES } from '../../constants/routes';
import { delResponseErrors } from '../../redux/reducers/auth-reducer';
import { toggleOpenMenu } from '../../redux/reducers/menu-reducer';
import { RootState } from '../../redux/redux-store';
import { Menu } from '../menu';

import './header.scss';

export const Header: React.FC = () => {
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleOpenMenu(event.target.checked));
  };

  const onHandleClickProfile = () => {
    setIsProfileMenu(!isProfileMenu);
  };

  const onHandleLogOut = () => {
    dispatch(delResponseErrors());
  };

  return (
    <section className='header'>
      {isMenuOpen && <Menu data-test-id='burger-navigation' isHeader={true} />}
      <div className='header__logo-box'>
        <img className='header__logo' src={logo} alt='logo' />
        <div data-test-id='button-burger' className={classNames('hamburger-menu', isMenuOpen ? 'open' : 'close')}>
          <input id='menu__toggle' type='checkbox' checked={isMenuOpen} onChange={onHandleChange} />
          <div className='menu__btn'> </div>
        </div>
        <span className='header__title'>Библиотека</span>
      </div>
      <button type='button' className='header__user-info' onClick={onHandleClickProfile}>
        <span>Привет, Иван!</span>
        <img src={avatar} alt='avatar' />
      </button>
      {isProfileMenu && (
        <div className='header__profile'>
          <NavLink
            to={ROUTES_NAMES.PROFILE}
            className={({ isActive }) => (isActive ? 'profile__data active' : 'profile__data')}
          >
            Профиль
          </NavLink>
          <NavLink
            data-test-id='exit-button'
            onClick={onHandleLogOut}
            to={ROUTES_NAMES.LOGOUT}
            className={({ isActive }) => (isActive ? 'profile__exit active' : 'profile__exit')}
          >
            Выход
          </NavLink>
        </div>
      )}
    </section>
  );
};
