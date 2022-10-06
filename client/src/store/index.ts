import { combineReducers, configureStore } from '@reduxjs/toolkit';
import attachmentReducer from "./slices/attachmentSlice";
import authReducer from "./slices/authSlice";

const combinedReducer = combineReducers({
    attachment : attachmentReducer,
    auth: authReducer,
});

export default configureStore({
  reducer: combinedReducer,
  devTools:true
});
