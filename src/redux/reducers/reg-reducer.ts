import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import * as yup from 'yup';

import { POST_REGISTER_API } from '../../constants/api';
import { schemaOne, schemaThree, schemaTwo } from '../../constants/shema';
import { AuthUserType, RegErrType, RegUserType } from '../../interfaces';
import { RegResType } from '../../interfaces/reg-user';

export interface ValueForm {
  placeholder: string;
  title: string;
  schemaName: string;
  value: string;
  help?: string;
}

export interface Step {
  schema: yup.ObjectSchema<any>;
  btnName: string;
  values: ValueForm[];
}

export interface UserRegState {
  status: string;
  error: SerializedError | null;
  userData: null | AuthUserType;
  statusCode: number | null;
  stateForm: {
    index: number;
    steps: Step[];
    inputData: yup.InferType<any>;
  };
}

const initialState: UserRegState = {
  status: 'idle',
  error: null,
  statusCode: null,
  userData: null,
  stateForm: {
    index: 0,
    inputData: {},
    steps: [
      {
        schema: schemaOne,
        btnName: 'следующий шаг',
        values: [
          {
            title: 'Логин',
            placeholder: 'Придумайте логин для входа',
            schemaName: 'username',
            value: '',
            help: 'Используйте для логина латинский алфавит и цифры',
          },
          {
            title: 'Пароль',
            placeholder: 'Пароль',
            schemaName: 'password',
            value: '',
            help: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
          },
        ],
      },
      {
        schema: schemaTwo,
        btnName: 'последний шаг',
        values: [
          {
            title: 'Имя',
            placeholder: 'Имя',
            schemaName: 'firstName',
            value: '',
            help: '',
          },
          {
            title: 'Фамилия',
            placeholder: 'Фамилия',
            schemaName: 'lastName',
            value: '',
            help: '',
          },
        ],
      },
      {
        schema: schemaThree,
        btnName: 'зарегистрироваться',
        values: [
          {
            title: 'Номер телефона',
            placeholder: 'Номер телефона',
            schemaName: 'phone',
            value: '',
            help: '',
          },
          {
            title: 'E-mail',
            placeholder: 'E-mail',
            schemaName: 'email',
            value: '',
            help: '',
          },
        ],
      },
    ],
  },
};

export const fetchReg = createAsyncThunk('reg', async (data: RegUserType) => {
  let response;

  try {
    response = await axios.post(POST_REGISTER_API, data);

    return response;
  } catch (error: any) {
    response = error.response.data;
  }

  return response;
});

const regAdapter = createEntityAdapter();

export const regSlice = createSlice({
  name: 'reg',
  initialState: regAdapter.getInitialState(initialState),
  reducers: {
    setValueError: (state, action: PayloadAction<SerializedError | null>) => {
      state.error = action.payload;
    },
    setNextStep: (state, action) => {
      state.stateForm.index += 1;
      state.stateForm.inputData = { ...state.stateForm.inputData, ...action.payload };
    },
    setStateFormIndex: (state) => {
      state.stateForm.index = 0;
      state.error = null;
      state.statusCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReg.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReg.fulfilled, (state, action: PayloadAction<RegResType | RegErrType>) => {
        state.error = null;
        const tempResponse = action.payload;

        if (tempResponse.data === null) {
          state.statusCode = tempResponse.error.status;
        } else {
          state.statusCode = 200;
          state.userData = tempResponse.data;
        }
        state.status = 'idle';
      })
      .addCase(fetchReg.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { setValueError, setNextStep, setStateFormIndex } = regSlice.actions;

export const regReducer = regSlice.reducer;
