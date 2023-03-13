import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import * as yup from 'yup';

import { ROUTES_NAMES } from '../../constants/routes';
import { schemaFour } from '../../constants/shema';
import { delResponseErrors, fetchResetPassword } from '../../redux/reducers/auth-reducer';
import { RootState } from '../../redux/redux-store';
import { ModalResponse } from '../modal-response';

import './password-reset.scss';

type FormData = yup.InferType<typeof schemaFour>;

export const PasswordReset: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const statusCode = useSelector((state: RootState) => state.auth.statusCode);

  const {
    register,
    handleSubmit,
    getFieldState,
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: yupResolver(schemaFour),
  });

  const onSubmit = (data: FormData) => {
    // reset((values) => values, {
    //   keepIsSubmitted: false,
    //   keepTouched: false,
    //   keepErrors: false,
    //   keepValues: false,
    //   keepDirty: false,
    // });
    const code = searchParams.get('code');
    const body = { ...data, code: code ? code : '' };

    dispatch(fetchResetPassword(body));
  };

  const onHandleToAuth = () => {
    navigate(ROUTES_NAMES.AUTH);
  };

  const onHandleRepeatChangePsw = () => {
    dispatch(delResponseErrors());
  };

  return (
    <section className='psw-reset'>
      {statusCode === 200 ? (
        <ModalResponse
          title='Новые данные сохранены'
          text='Зайдите в личный кабинет, используя свои логин и новый пароль'
          btnName='вход'
          action={onHandleToAuth}
        />
      ) : statusCode === null ? (
        <Fragment>
          <span className='psw-reset__title'>Восстановление пароля</span>
          <form data-test-id='reset-password-form' className='psw-reset__form form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form__main'>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('password')}
                  placeholder='Новый пароль'
                />
                <span className='label__placeholder'>Новый пароль</span>

                <p
                  data-test-id='hint'
                  className={classNames(
                    'label__message',
                    getFieldState('password').isTouched &&
                      getFieldState('password').invalid &&
                      !getFieldState('password').isDirty
                      ? 'hightlight'
                      : ''
                  )}
                >
                  {getFieldState('password').isTouched &&
                    getFieldState('password').invalid &&
                    !getFieldState('password').isDirty &&
                    getFieldState('password').error?.message}
                </p>
              </label>
              <label className={classNames('form__main_label label')}>
                <input
                  className={classNames('label__input', statusCode && 'error')}
                  {...register('passwordConfirmation')}
                  placeholder='Повторите пароль'
                />
                <span className='label__placeholder'>Повторите пароль</span>
                <p
                  data-test-id='hint'
                  className={classNames(
                    'label__message',
                    getFieldState('passwordConfirmation').isTouched &&
                      getFieldState('passwordConfirmation').invalid &&
                      !getFieldState('passwordConfirmation').isDirty
                      ? 'hightlight'
                      : ''
                  )}
                >
                  {getFieldState('passwordConfirmation').isTouched &&
                    getFieldState('passwordConfirmation').invalid &&
                    !getFieldState('passwordConfirmation').isDirty &&
                    getFieldState('passwordConfirmation').error?.message}
                </p>
              </label>
            </div>

            <input className='form__submit' type='submit' value='сохранить изменения' />

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
          action={onHandleRepeatChangePsw}
        />
      )}
    </section>
  );
};
