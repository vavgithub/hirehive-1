import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newMembersCount : 0,
    loading : false,
    error : ""
}

const adminSlice = createSlice({
    name : "Admin",
    initialState,
    reducers : {
        setMembersCount : (state,action) => {
            state.newMembersCount = action.payload
            state.loading = false
            state.error = ""
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
}) 

export const { setMembersCount , setLoading , setError } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;