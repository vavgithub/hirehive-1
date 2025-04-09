import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './candidateSlice';
import applicationStageReducer from './applicationStageSlice';
import candidateAuthReducer from './candidateAuthSlice'
import { adminReducer } from './AdminSlice';

const loggerMiddleware = store => next => action => {
  let result = next(action);
  return result;
};

export const store = configureStore({
  reducer: {
    admin : adminReducer,
    candidate: candidateReducer, // For hiring management
    candidateAuth: candidateAuthReducer, // For candidate portal
    applicationStage: applicationStageReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});