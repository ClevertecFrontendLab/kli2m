import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

import { POST_AUTH_API, POST_FORGOT_PASSWORD_API, POST_RESET_PASSWORD_API } from '../../constants/api';
import { AuthResType, AuthUserType, PostAuthType, PostResetPassType, RegErrType } from '../../interfaces';

export interface UserAuthState {
  status: string;
  isAuth: boolean;
  error: SerializedError | null;
  statusCode: number | null;
  user: AuthUserType | null;
}

const initialState: UserAuthState = {
  status: 'idle',
  isAuth: false,
  error: null,
  user: null,
  statusCode: null,
};

export const fetchAuth = createAsyncThunk('auth', async (data: PostAuthType) => {
  let response;

  try {
    response = await await axios.post(POST_AUTH_API, data);

    return response;
  } catch (error: any) {
    response = error.response;
  }

  return response;
});

export const fetchSendEmail = createAsyncThunk('sendEmail', async (data: string) => {
  let response;

  try {
    response = await await axios.post(POST_FORGOT_PASSWORD_API, { email: data });

    return response;
  } catch (error: any) {
    response = error.response.data;
  }

  return response;
});

export const fetchResetPassword = createAsyncThunk('resetPassword', async (data: PostResetPassType) => {
  let response;

  try {
    response = await await axios.post(POST_RESET_PASSWORD_API, data);

    return response;
  } catch (error: any) {
    response = error.response;
  }

  return response;
});

const authAdapter = createEntityAdapter();

export const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState(initialState),
  reducers: {
    setValueError: (state, action: PayloadAction<SerializedError | null>) => {
      state.error = action.payload;
    },
    delResponseErrors: (state) => {
      state.error = null;
      state.statusCode = null;
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isAuth = false;
        state.user = null;
        state.statusCode = null;

      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<AuthResType | RegErrType>) => {
        state.error = null;
        const tempResponse = action.payload;

        if (tempResponse.status === 400) {
          state.statusCode = 400;
          state.error = new Error('Неверный логин или пароль!');
          state.isAuth = false;
        } else if (tempResponse.status === 200) {
          state.statusCode = 200;
          state.user = tempResponse.data;
          state.isAuth = true;
          state.error = null;
        } else {
          state.statusCode = 500;
          state.error = new Error(tempResponse.error?.message);
          state.isAuth = false;
        }
        state.status = 'idle';
      })
      .addCase(fetchAuth.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error;
        state.statusCode = Number(action.payload);
        state.isAuth = false;
        state.user = null;
      })
      .addCase(fetchSendEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isAuth = false;
        state.user = null;
        state.statusCode = null;

      })
      .addCase(fetchSendEmail.fulfilled, (state, action: PayloadAction<AuthResType>) => {

        const tempResponse = action.payload

        if (tempResponse.status) {
          state.statusCode = tempResponse.status;
         if( tempResponse.error) state.error = new Error('error')
        } else if (tempResponse.error?.status) {
          state.statusCode = tempResponse.error?.status;
          state.error = tempResponse.error
        } else if (tempResponse.statusCode) {
          state.statusCode = tempResponse.statusCode;
        }
        state.status = 'idle';
      })
      .addCase(fetchSendEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.isAuth = false;
        state.user = null;
        state.statusCode = 500;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isAuth = false;
        state.user = null;
        state.statusCode = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action: PayloadAction<AuthResType>) => {
        const tempResponse = action.payload

        if (tempResponse.status) {
          state.statusCode = tempResponse.status;
        } else if (tempResponse.error?.status) {
          state.statusCode = tempResponse.error?.status;
        } else if (tempResponse.statusCode) {
          state.statusCode = tempResponse.statusCode;
        }
        state.status = 'idle';
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.isAuth = false;
        state.user = null;
        state.statusCode = 500;

      });
  },
});

export const { setValueError, delResponseErrors } = authSlice.actions;

export const authReducer = authSlice.reducer;
