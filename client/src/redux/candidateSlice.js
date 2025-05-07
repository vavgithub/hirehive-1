// candidateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidateData: null,
  collapseContactUs : true,
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    setCandidateData: (state, action) => {
      state.candidateData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCollapseContactUs : (state,action) => {
      state.collapseContactUs = action.payload
    }
  },
});

export const { setCandidateData, setLoading, setError , setCollapseContactUs } = candidateSlice.actions;
export default candidateSlice.reducer;