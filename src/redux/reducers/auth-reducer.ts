import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

import { POST_AUTH_API } from '../../constants/api';
import { AuthUserType } from '../../interfaces';

export interface UserAuthState {
  status: string;
  isAuth: boolean;
  error: SerializedError | null;
}

const initialState: UserAuthState = {
  status: 'idle',
  isAuth: false,
  error: null,
};

export const fetchAuth = createAsyncThunk('auth', async () => {
  const resAuth = await axios.post(POST_AUTH_API);

  return resAuth.data;
});

const authAdapter = createEntityAdapter();

export const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState(initialState),
  reducers: {
    setValueError: (state, action: PayloadAction<SerializedError | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<AuthUserType>) => {

        state.isAuth = true;
        state.status = 'idle';
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.isAuth = false;
      });
  },
});

export const { setValueError } = authSlice.actions;

export const authReducer = authSlice.reducer;
