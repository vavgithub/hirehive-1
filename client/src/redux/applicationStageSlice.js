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
      console.log('setCurrentStage action called with:', action.payload);
      state.currentStage = action.payload;
    },
    setStageStatuses: (state, action) => {
      console.log('setStageStatuses action called with:', action.payload);
      state.stageStatuses = action.payload;
    },
    updateStageStatus: (state, action) => {
      console.log('updateStageStatus action called with:', action.payload);
      const { stage, status, data } = action.payload;
      if (state.stageStatuses[stage]) {
        state.stageStatuses[stage] = { ...state.stageStatuses[stage], status, ...data };
      } else {
        console.warn(`Attempted to update non-existent stage: ${stage}`);
      }
    },
  },
});

export const { setCurrentStage, setStageStatuses, updateStageStatus } = applicationStageSlice.actions;
export default applicationStageSlice.reducer;