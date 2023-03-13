import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import * as yup from 'yup';

import { ROUTES_NAMES } from '../../constants/routes';
import { schemaFive } from '../../constants/shema';
import { fetchSendEmail } from '../../redux/reducers/auth-reducer';
import { RootState } from '../../redux/redux-store';
import { ModalResponse } from '../modal-response';

import './password-recovery.scss';

export const PasswordRecovery: React.FC = (): JSX.Element => {
  type FormData = yup.InferType<typeof schemaFive>;

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const statusCode = useSelector((state: RootState) => state.auth.statusCode);
  const error = useSelector((state: RootState) => state.auth.error);

  const { register, handleSubmit, getFieldState, formState:{errors} } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schemaFive),
  });

  const onSubmit = (data: FormData) => {
    // reset((values) => values, {
    //   keepIsSubmitted: false,
    //   keepTouched: false,
    //   keepErrors: false,
    //   keepValues: false,
    //   keepDirty: false,
    // });
    dispatch(fetchSendEmail(data.email));
  };

const onInvalid = ()=>{
console.log(errors)
}

  return (
    <section className='psw-recovery'>
      {statusCode === 200 ? (
        <ModalResponse
          title='Письмо выслано'
          text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
        />
      ) : (
        <Fragment>
          <NavLink className='psw-recovery__link-to-auth' to={ROUTES_NAMES.AUTH}>
            вход в личный кабинет
          </NavLink>
          <span className='psw-recovery__title'>Восстановление пароля</span>
          <form data-test-id='send-email-form' className='psw-recovery__form form' onSubmit={handleSubmit(onSubmit,onInvalid)}>
            <div className='form__main'>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('email')}
                  placeholder='Email'
                />
                <span className='label__placeholder'>Email</span>

                {error ? (
                  <p data-test-id='hint' className={classNames('label__message', 'hightlight')}>
                    error
                  </p>
                ) : getFieldState('email').error?.message ? (
                  <p
                    data-test-id='hint'
                    className={classNames(
                      'label__message',
                      getFieldState('email').isTouched &&
                        getFieldState('email').invalid &&
                        !getFieldState('email').isDirty
                        ? 'hightlight'
                        : ''
                    )}
                  >
                    {getFieldState('email').isTouched &&
                      getFieldState('email').invalid &&
                      !getFieldState('email').isDirty &&
                      getFieldState('email').error?.message}
                  </p>
                ) : (
                  <p data-test-id='hint' className='label__message-info'>
                    На это email будет отправлено письмо с инструкциями по восстановлению пароля
                  </p>
                )}
              </label>
            </div>

            <input className='form__submit' type='submit' value='восстановить' />

            <div className='form__reg-box'>
              <span className='form__reg-box_question'>Нет учётной записи?</span>
              <NavLink className='form__reg-box_link' to={ROUTES_NAMES.REGISTRATION}>
                Регистрация
              </NavLink>
            </div>
          </form>
        </Fragment>
      )}
    </section>
  );
};
