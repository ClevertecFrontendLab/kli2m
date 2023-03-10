import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

import { POST_AUTH_API, POST_FORGOT_PASSWORD_API, POST_RESET_PASSWORD_API } from '../../constants/api';
import { AuthResType, AuthUserType, PostAuthType, PostResetPassType,RegErrType } from '../../interfaces';

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
    response = error.response.data;
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
    response = await await axios.post(POST_RESET_PASSWORD_API,  data );

    return response;
  } catch (error: any) {
    response = error.response.data;
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
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<AuthResType | RegErrType>) => {
        state.error = null;
        const tempResponse = action.payload;

        if (tempResponse.data === null) {
          state.statusCode = tempResponse.error.status;
          state.error = tempResponse.error;
          state.isAuth = false;
        } else {
          state.statusCode = 200;
          state.user = tempResponse.data;
          state.isAuth = true;
          state.error = null;
        }
        state.status = 'idle';
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(fetchSendEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(fetchSendEmail.fulfilled, (state, action: PayloadAction<{ data: { ok: boolean } }>) => {
        if (action.payload.data.ok) {
          state.statusCode = 200;
          state.error = null;
        } else state.statusCode = 400;
        state.status = 'idle';
      })
      .addCase(fetchSendEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action: PayloadAction<AuthResType>) => {
        if (action.payload.data) {
          state.statusCode = 200;
          state.error = null;
        } else state.statusCode = 400;
        state.status = 'idle';
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.isAuth = false;
        state.user = null;
      });
  },
});

export const { setValueError, delResponseErrors } = authSlice.actions;

export const authReducer = authSlice.reducer;
