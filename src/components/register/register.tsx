import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { ROUTES_NAMES } from '../../constants/routes';
import { fetchReg, setStateFormIndex } from '../../redux/reducers/reg-reducer';
import { RootState } from '../../redux/redux-store';
import { FormReg } from '../form-reg';
import { ModalResponse } from '../modal-response';

import './register.scss';

export const Register: React.FC = (): JSX.Element => {
  const stateForm = useSelector((state: RootState) => state.reg.stateForm);
  const error = useSelector((state: RootState) => state.reg.error);
  const statusCode = useSelector((state: RootState) => state.reg.statusCode);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);


  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  useEffect(() => {
    if (stateForm.index > stateForm.steps.length - 1 && !isAuth) dispatch(fetchReg(stateForm.inputData)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateForm]);

  const onHandleToSignIn = () => {
    navigate(ROUTES_NAMES.AUTH);
  };

  const onHandleRepeat = () => {
    dispatch(setStateFormIndex());
  };

  return (
    <section className='register'>
      {error === null && statusCode === null ? (
        <Fragment>
          <span className='register__title'>Регистрация</span>

          <span className='register__count'>{`${stateForm.index + 1} шаг из ${stateForm.steps.length} `}</span>

          {stateForm.steps.map((step, ind) => (
            <FormReg key={`${ind +1}`} step={step} isActive={ind === stateForm.index} />
          ))}

          <div className='form__reg-box'>
            <span className='form__reg-box_question'>Есть учётная запись?</span>
            <NavLink className='form__reg-box_link' to={ROUTES_NAMES.AUTH}>
              войти
            </NavLink>
          </div>
        </Fragment>
      ) : error === null && statusCode === 200 ? (
        <ModalResponse
          title='Регистрация успешна'
          text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
          btnName='войти'
          action={onHandleToSignIn}
        />
      ) : error === null && statusCode === 400 ? (
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
