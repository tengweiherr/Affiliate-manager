import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('profile'));

export const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {

    login : (state, action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        return action?.payload ;
    },
    logout : (state, action) => {
        localStorage.clear();
        return null;
    },

  },
});

export const { login,logout } = authSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default authSlice.reducer;