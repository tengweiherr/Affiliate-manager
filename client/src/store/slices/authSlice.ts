import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api"
import { LoginData, UserIDToken } from "../../types";

// const initialState = {
//   id:JSON.parse(localStorage.getItem('user')),
//   token:JSON.parse(localStorage.getItem('user'))
// }

// const initialState = JSON.parse(localStorage.getItem('user')) || null;

// const initialState = null;
//will generate pending, fulfilled, and rejected action types
// export const fetchLocalStorage = createAsyncThunk(
//   'auth/fetchLocalStorage',
//   ()=>{
//     return JSON.parse(localStorage.getItem('user'))
//   })
const localStorageData = localStorage.getItem('profile');
const initialState:UserIDToken|null = localStorageData!== null? JSON.parse(localStorageData) : null;

//will generate pending, fulfilled, and rejected action types
export const requestLogin = createAsyncThunk(
  'auth/requestLogin',
  (loginData:LoginData)=>{
    return API.login(loginData)
  })

export const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    //fetchLocalStorage
    builder
      .addCase(requestLogin.pending, (state)=>{
        
      })
      .addCase(requestLogin.fulfilled, (state,action)=>{
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        state = action.payload;
      })
      .addCase(requestLogin.rejected, (state,action)=>{
        console.log(action.error.message)
      })
  },
  reducers: {
    login : (state, action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        return action?.payload;
    },
    logout : (state) => {
        localStorage.clear();
        return null;
    },

  },
});

export const { login,logout } = authSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default authSlice.reducer;

