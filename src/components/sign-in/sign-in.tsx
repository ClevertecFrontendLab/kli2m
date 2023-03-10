import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import * as yup from 'yup';

import { ROUTES_NAMES } from '../../constants/routes';
import { schemaOne } from '../../constants/shema';
import { delResponseErrors, fetchAuth } from '../../redux/reducers/auth-reducer';
import { RootState } from '../../redux/redux-store';
import { ModalResponse } from '../modal-response';

import './sign-in.scss';

type FormData = yup.InferType<typeof schemaOne>;

export const SignIn: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const statusCode = useSelector((state: RootState) => state.auth.statusCode);
  const error = useSelector((state: RootState) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaOne),
  });

  const onSubmit = (data: FormData) => {
    dispatch(fetchAuth({ identifier: data.username, password: data.password }));
  };

  const onHandleToRepeat = () => {
    dispatch(delResponseErrors());
  };

  return (
    <section className='sign-in'>
      {statusCode === 200 || statusCode === 400 || statusCode === null ? (
        <Fragment>
          <span className='sign-in__title'>Вход в личный кабинет</span>
          <form className='sign-in__form form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form__main'>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('username')}
                  placeholder='Логин'
                />
                <span className='label__placeholder'>Логин</span>
                <p className='label__message'>{errors.username?.message}</p>
              </label>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('password')}
                  placeholder='Пароль'
                />
                <span className='label__placeholder'>Пароль</span>
                <p className='label__message'>{errors.password?.message}</p>
              </label>
            </div>

            {statusCode ? (
              <div className='form__forgot_box'>
                <p className='message'>{error?.message}</p>
                <NavLink className='forgot' to={ROUTES_NAMES.RESET_PASS}>
                  Восстановить ?
                </NavLink>
              </div>
            ) : (
              <NavLink className='form__forgot' to={ROUTES_NAMES.RESET_PASS}>
                Забыли логин или пароль?
              </NavLink>
            )}

            <input className='form__submit' type='submit' />

            <div className='form__reg-box'>
              <span className='form__reg-box_question'>Нет учётной записи?</span>
              <NavLink className='form__reg-box_link' to={ROUTES_NAMES.REGISTRATION}>
                Регистрация
              </NavLink>
            </div>
          </form>
        </Fragment>
      ) : (
        <ModalResponse
          title='Вход не выполнен'
          text='Что-то пошло не так. Попробуйте ещё раз'
          btnName='Повторить'
          action={onHandleToRepeat}
        />
      )}
    </section>
  );
};
