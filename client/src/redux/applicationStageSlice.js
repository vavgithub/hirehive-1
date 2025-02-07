// applicationStageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStage: '',
  stageStatuses: {},
};

const applicationStageSlice = createSlice({
  name: 'applicationStage',
  initialState,
  reducers: {
    setCurrentStage: (state, action) => {
      state.currentStage = action.payload;
    },
    setStageStatuses: (state, action) => {
      state.stageStatuses = action.payload;
    },
    updateStageStatus: (state, action) => {
      const { stage, status, data } = action.payload;
      if (state.stageStatuses[stage]) {
        state.stageStatuses[stage] = { ...state.stageStatuses[stage], status, ...data };
      } else {
        // console.warn(`Attempted to update non-existent stage: ${stage}`);
      }
    },
  },
});

export const { setCurrentStage, setStageStatuses, updateStageStatus } = applicationStageSlice.actions;
export default applicationStageSlice.reducer;