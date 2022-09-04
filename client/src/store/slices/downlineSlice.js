import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "downline",
  initialState: [],
  reducers: {

    getDownlines: (state, action) => {
        return action.payload
    },

    createDownline: (state, action) => {
       return [...state, action.payload];
    },

    updateDownline: (state, action) => {
       return state.map((downline) => downline._id === action.payload._id ? action.payload : downline);
    },

    deleteDownline: (state, action) => {
        return state.filter((downline) => downline._id !== action.payload);
    }

  },
});

export const { getDownlines, createDownline, updateDownline, deleteDownline } = authSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default authSlice.reducer;