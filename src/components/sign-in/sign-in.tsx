import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import * as yup from 'yup';

import { ReactComponent as EyeCloseImg } from '../../assets/img/auth/eyeClose.svg';
import { ReactComponent as EyeOpenImg } from '../../assets/img/auth/eyeOpen.svg';
import { ReactComponent as ValidImg } from '../../assets/img/auth/valid.svg';
import { ROUTES_NAMES } from '../../constants/routes';
import { schemaSix } from '../../constants/shema';
import { delResponseErrors, fetchAuth } from '../../redux/reducers/auth-reducer';
import { RootState } from '../../redux/redux-store';
import { ModalResponse } from '../modal-response';

import './sign-in.scss';

type FormData = yup.InferType<typeof schemaSix>;

export const SignIn: React.FC = (): JSX.Element => {
  const [isVisibleEye, sertIsVisibleEye] = useState(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const statusCode = useSelector((state: RootState) => state.auth.statusCode);
  const error = useSelector((state: RootState) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
  } = useForm<FormData>({ mode: 'all', resolver: yupResolver(schemaSix) });

  const onSubmit = (data: FormData) => {
    dispatch(fetchAuth({ identifier: data.identifier, password: data.password }));
  };

  const onHandleToRepeat = () => {
    dispatch(delResponseErrors());
  };
  const onHandleToggleEye = () => {
    sertIsVisibleEye(!isVisibleEye);
  };

  return (
    <section className='sign-in' >
      {statusCode === 200 || statusCode === 400 || statusCode === null ? (
        <Fragment>
          <span className='sign-in__title'>Вход в личный кабинет</span>
          <form data-test-id='auth-form' className='sign-in__form form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form__main'>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('identifier')}
                  placeholder='Логин'
                />
                <span className='label__placeholder'>Логин</span>
                <p data-test-id='hint' className={classNames('label__message', errors.identifier?.message && 'error')}>
                  {errors.identifier?.message}
                </p>
              </label>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('password')}
                  placeholder='Пароль'
                  type={isVisibleEye ? 'text' : 'password'}
                />
                <span className='label__placeholder'>Пароль</span>
                <p data-test-id='hint' className={classNames('label__message', errors.password?.message && 'error')}>
                  {errors.password?.message}
                </p>
                {!getFieldState('password').invalid && getFieldState('password').isDirty && <ValidImg className='valid-img' data-test-id='checkmark' />}
                {getFieldState('password').isDirty && (
                  <button className='action-eye' onClick={onHandleToggleEye} type='button'>
                    {isVisibleEye ? (
                      <EyeOpenImg data-test-id='eye-opened' />
                    ) : (
                      <EyeCloseImg data-test-id='eye-closed' />
                    )}
                  </button>
                )}
              </label>
            </div>

            {statusCode ? (
              <div className='form__forgot_box'>
                <p className='message' data-test-id='hint'>
                  {error?.message}
                </p>
                <NavLink className='forgot' to={ROUTES_NAMES.FORGOT_PASS}>
                  Восстановить ?
                </NavLink>
              </div>
            ) : (
              <NavLink className='form__forgot' to={ROUTES_NAMES.FORGOT_PASS}>
                Забыли логин или пароль?
              </NavLink>
            )}

            <button className='form__submit' type='submit'>
              вход
            </button>

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
