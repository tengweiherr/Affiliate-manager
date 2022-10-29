import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import attachmentReducer from "./slices/attachmentSlice";
import authReducer from "./slices/authSlice";

const combinedReducer = combineReducers({
    attachment : attachmentReducer,
    auth: authReducer,
});

// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: combinedReducer,
  devTools:true
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
