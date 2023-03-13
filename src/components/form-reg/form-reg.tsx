import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';

import { PHONE_MASK } from '../../constants/mask';
import { REGEXP_NUMBER, REGEXP_STRING, REGEXP_UPPER_STRING } from '../../constants/reg-expressions';
import { ROUTES_NAMES } from '../../constants/routes';
import { setNextStep, Step } from '../../redux/reducers/reg-reducer';

import './form-reg.scss';

const getLogoWarningPhrase = (str: string): JSX.Element => (
  <Fragment>
    Используйте для логина{' '}
    <span className={classNames(REGEXP_STRING.test(str) ? '' : 'hightlight')}>латинский алфавит</span> и{' '}
    <span className={classNames(REGEXP_NUMBER.test(str) ? '' : 'hightlight')}>цифры</span>
  </Fragment>
);

const getPasswordWarningPhrase = (str: string): JSX.Element => {
  const strLength = str.length;

  return (
    <Fragment>
      Пароль <span className={classNames(strLength > 7 ? '' : 'hightlight')}>не менее 8 символов</span> ,{' '}
      <span className={classNames(REGEXP_UPPER_STRING.test(str) ? '' : 'hightlight')}>с заглавной буквой</span> и{' '}
      <span className={classNames(REGEXP_NUMBER.test(str) ? '' : 'hightlight')}>цифрой</span>
    </Fragment>
  );
};

export const FormReg: React.FC<{ step: Step; isActive: boolean }> = ({ step, isActive }): JSX.Element => {
  const dispatch = useDispatch();

  type FormData = yup.InferType<typeof step.schema>;

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    getFieldState,
    control,
    reset,
    watch,
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(step.schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(setNextStep(data));
    reset();
  };

  const onInvalid = () => {
    reset();
  };

  const onHandleClickSubmit = () => {};

  const onHandleChangeAlert = (event: React.ChangeEvent<HTMLInputElement>, str: string) => {};

  return (
    <form
      data-test-id='register-form'
      className={classNames('register__form form', isActive ? 'active' : 'no-active')}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <div className='form__main'>
        {step.values.map((item, ind) => (
          <label key={`${ind + 1}`} className='form__main_label label'>
            {item.schemaName === 'phone' ? (
              <Controller
                name={item.schemaName}
                control={control}
                defaultValue={item.value}
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    mask={PHONE_MASK}
                    placeholderChar='X'
                    className='label__input'
                    placeholder={item.placeholder}
                  />
                )}
              />
            ) : (
              <input
                className='label__input'
                {...register(item.schemaName)}
                defaultValue={item.value}
                placeholder={item.placeholder}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onHandleChangeAlert(event, item.schemaName)}
              />
            )}

            <span className={classNames('label__placeholder')}>{item.title}</span>
            {item.help ? (
              <p
                data-test-id='hint'
                className={classNames(
                  'label__message',
                  getFieldState(item.schemaName).isTouched &&
                    getFieldState(item.schemaName).invalid &&
                    !getFieldState(item.schemaName).isDirty
                    ? 'hightlight'
                    : ''
                )}
              >
                {getFieldState(item.schemaName).isDirty ? (
                  item.schemaName === 'username' ? (
                    getLogoWarningPhrase(watch(item.schemaName, false))
                  ) : (
                    // : (
                    //    item.schemaName === 'password' ? (
                    //     getPasswordWarningPhrase(watch(item.schemaName, false))
                    //   )
                    <span className='hightlight'>{item.help}</span>
                  )
                ) : (
                  getFieldState(item.schemaName).isTouched &&
                  getFieldState(item.schemaName).invalid &&
                  !getFieldState(item.schemaName).isDirty &&
                  getFieldState(item.schemaName).error?.message
                )}
              </p>
            ) : (
              <p
                data-test-id='hint'
                className={classNames(
                  'label__message',
                  getFieldState(item.schemaName).isTouched &&
                    getFieldState(item.schemaName).invalid &&
                    !getFieldState(item.schemaName).isDirty &&
                    'hightlight'
                )}
              >
                {getFieldState(item.schemaName).isTouched &&
                  getFieldState(item.schemaName).invalid &&
                  !getFieldState(item.schemaName).isDirty &&
                  getFieldState(item.schemaName).error?.message}
              </p>
            )}
          </label>
        ))}
      </div>

      <input
        className='form__submit'
        type='submit'
        disabled={errors || !isValid || !isDirty ? false : true}
        onClick={onHandleClickSubmit}
        value={step.btnName}
      />
      <div className='form__reg-box'>
        <span className='form__reg-box_question'>Есть учётная запись?</span>
        <NavLink className='form__reg-box_link' to={ROUTES_NAMES.AUTH}>
          войти
        </NavLink>
      </div>
    </form>
  );
};
