import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { ROUTES_NAMES } from '../../constants/routes';
import { fetchReg, setResetStatusCode, setStateFormIndex } from '../../redux/reducers/reg-reducer';
import { RootState } from '../../redux/redux-store';
import { FormReg } from '../form-reg';
import { ModalResponse } from '../modal-response';

import './register.scss';

export const Register: React.FC = (): JSX.Element => {
  const stateForm = useSelector((state: RootState) => state.reg.stateForm);
  const statusCode = useSelector((state: RootState) => state.reg.statusCode);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  useEffect(() => {
    if (stateForm.index > stateForm.steps.length - 1 && !isAuth) {
      dispatch(fetchReg(stateForm.inputData));
      dispatch(setStateFormIndex());
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateForm]);

  const onHandleToSignIn = () => {
    navigate(ROUTES_NAMES.AUTH);
  };

  const onHandleRepeat = () => {
    dispatch(setResetStatusCode());
  };

  return (
    <section className='register' >
      {statusCode === null ? (
        <Fragment>
          <span className='register__title'>Регистрация</span>

          <span className='register__count'>{`${stateForm.index + 1} шаг из ${stateForm.steps.length} `}</span>

          {stateForm.steps.map((step, ind) => (
            <FormReg key={`${ind + 1}`} step={step} isActive={ind === stateForm.index} />
          ))}
        </Fragment>
      ) : statusCode === 200 ? (
        <ModalResponse
          title='Регистрация успешна'
          text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
          btnName='вход'
          action={onHandleToSignIn}
        />
      ) : statusCode === 400 ? (
        <ModalResponse
          title='Данные не сохранились'
          text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
          btnName='назад к регистрации'
          action={onHandleRepeat}
        />
      ) : (
        <ModalResponse
          title='Данные не сохранились'
          text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
          btnName='повторить'
          action={onHandleRepeat}
        />
      )}
    </section>
  );
};
