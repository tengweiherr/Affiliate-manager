import { combineReducers, configureStore } from '@reduxjs/toolkit';
import downlineReducer from "../store/slices/downlineSlice";
import authReducer from "../store/slices/authSlice";

const combinedReducer = combineReducers({
    downline : downlineReducer,
    auth: authReducer,
});


export default configureStore({
  reducer: combinedReducer,
  devTools:true
});