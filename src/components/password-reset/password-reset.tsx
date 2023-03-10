import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import * as yup from 'yup';

import { schemaFour } from '../../constants/shema';
import { fetchResetPassword } from '../../redux/reducers/auth-reducer';
import { RootState } from '../../redux/redux-store';
import { ModalResponse } from '../modal-response';

import './password-reset.scss';

type FormData = yup.InferType<typeof schemaFour>;

export const PasswordReset: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [searchParams] = useSearchParams();

  const statusCode = useSelector((state: RootState) => state.auth.statusCode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schemaFour),
  });

  const onSubmit = (data: FormData) => {
    reset((values) => values, {
      keepIsSubmitted: false,
      keepTouched: false,
      keepErrors: false,
      keepValues: false,
      keepDirty: false,
    });
    const code = searchParams.get('code');
    const body = { ...data, code: code ? code : '' };

    dispatch(fetchResetPassword(body));
  };

  return (
    <section className='psw-reset'>
      {statusCode === 200 ? (
        <ModalResponse
          title='Новые данные сохранены'
          text='Зайдите в личный кабинет, используя свои логин и новый пароль'
          btnName='вход'
        />
      ) : statusCode === null ? (
        <Fragment>
          <span className='psw-reset__title'>Восстановление пароля</span>
          <form className='psw-reset__form form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form__main'>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('password')}
                  placeholder='Новый пароль'
                />
                <span className='label__placeholder'>Новый пароль</span>
                <p className='label__message'>{errors.password?.message}</p>
              </label>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('passwordConfirmation')}
                  placeholder='Повторите пароль'
                />
                <span className='label__placeholder'>Повторите пароль</span>
                <p className='label__message'>{errors.passwordConfirmation?.message}</p>
              </label>
            </div>

            <input className='form__submit' type='submit' />

            <span className='form__reg-box_question'>
              После сохранения войдите в библиотеку, используя новый пароль
            </span>
          </form>
        </Fragment>
      ) : (
        <ModalResponse
          title='Данные не сохранились'
          text='Что-то пошло не так. Попробуйте ещё раз'
          btnName='повторить'
        />
      )}
    </section>
  );
};
