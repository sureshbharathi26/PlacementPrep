import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import companyReducer from './companySlice';
import testReducer from './testSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    test: testReducer,
  },
});