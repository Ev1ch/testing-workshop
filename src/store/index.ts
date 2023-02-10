import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'modules/auth/slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

export default createWrapper(makeStore)