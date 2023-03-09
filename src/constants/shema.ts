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
      .required('Required field')
      .test('string', 'Must be string characters', (val) => REGEXP_STRING.test(val))
      .test('number', 'Must be number characters', (val) => REGEXP_NUMBER.test(val))
      .matches(REGEXP_LOGIN, 'Does not comply with the rule'),
    password: yup
      .string()
      .typeError('Must be a string')
      .required('Required field')
      .matches(REGEXP_PASSWORD, 'Does not comply with the rule'),
  })
  .required();

export const schemaTwo = yup
  .object({
    firstName: yup.string().required().matches(REGEXP_NAME, 'Does not comply with the rule'),
    lastName: yup.string().required().matches(REGEXP_NAME, 'Does not comply with the rule'),
  })
  .required();

export const schemaThree = yup
  .object({
    email: yup
      .string()
      .email('Enter the correct email')
      .required('Required field')
      .matches(REGEXP_EMAIL, 'Enter the correct email'),
    phone: yup.string().matches(REGEXP_PHONE, 'Enter the correct phone').required(),
  })
  .required();

export const schemaFour = yup
  .object({
    password: yup
      .string()
      .typeError('Must be a string')
      .required('Required field')
      .matches(REGEXP_PASSWORD, 'Does not comply with the rule'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], "Passwords don't match")
      .required('Required field'),
  })
  .required();
