import * as yup from 'yup';

import {
  REGEXP_EMAIL,
  REGEXP_LOGIN,
  REGEXP_NAME,
  REGEXP_NUMBER,
  REGEXP_PASSWORD,
  REGEXP_PHONE,
  REGEXP_STRING,
} from './reg-expressions';

export const schemaOne = yup
  .object({
    username: yup
      .string()
      .typeError('Must be a string')
      .required('Поле не может быть пустым')
      .test('string', 'Must be string characters', (val) => REGEXP_STRING.test(val))
      .test('number', 'Must be number characters', (val) => REGEXP_NUMBER.test(val))
      .matches(REGEXP_LOGIN, 'Does not comply with the rule'),
    password: yup
      .string()
      .typeError('Must be a string')
      .required('Поле не может быть пустым')
      .matches(REGEXP_PASSWORD, 'Does not comply with the rule'),
  })
  .required();

export const schemaTwo = yup
  .object({
    firstName: yup.string().required('Поле не может быть пустым').matches(REGEXP_NAME, 'Does not comply with the rule'),
    lastName: yup.string().required('Поле не может быть пустым').matches(REGEXP_NAME, 'Does not comply with the rule'),
  })
  .required();

export const schemaThree = yup
  .object({
    email: yup
      .string()
      .required('Поле не может быть пустым')
      .matches(REGEXP_EMAIL, 'Введите корректный e-mail'),
    phone: yup.string().required('Поле не может быть пустым').matches(REGEXP_PHONE, 'В формате +375 (xx) xxx-xx-xx'),
  })
  .required();

export const schemaFour = yup
  .object({
    password: yup
      .string()
      .typeError('Must be a string')
      .required('Поле не может быть пустым')
      .matches(REGEXP_PASSWORD, 'Does not comply with the rule'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], "Passwords don't match")
      .required('Поле не может быть пустым'),
  })
  .required();

export const schemaFive = yup
  .object({
    email: yup.string().required('Поле не может быть пустым').matches(REGEXP_EMAIL, 'Введите корректный e-mail'),
  })
  .required();

export const schemaSix = yup
  .object({
    identifier: yup
      .string()
      .typeError('Must be a string')
      .required('Поле не может быть пустым')
      .test('string', 'Must be string characters', (val) => REGEXP_STRING.test(val))
      .test('number', 'Must be number characters', (val) => REGEXP_NUMBER.test(val))
      .matches(REGEXP_LOGIN, 'Does not comply with the rule'),
    password: yup
      .string()
      .typeError('Must be a string')
      .required('Поле не может быть пустым')
      .matches(REGEXP_PASSWORD, 'Does not comply with the rule'),
  })
  .required();
