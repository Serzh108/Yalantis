import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { employeesSlice } from './employeesReduser';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const rootReducer = {
  [employeesSlice.name]: employeesSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});
