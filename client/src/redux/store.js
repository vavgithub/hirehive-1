import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './candidateSlice';
import applicationStageReducer from './applicationStageSlice';

const loggerMiddleware = store => next => action => {
  let result = next(action);
  return result;
};

export const store = configureStore({
  reducer: {
    candidate: candidateReducer,
    applicationStage: applicationStageReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});