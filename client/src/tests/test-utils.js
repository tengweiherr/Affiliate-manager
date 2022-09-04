import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import downlineReducer from "../store/slices/downlineSlice";
import authReducer from "../store/slices/authSlice";
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
    downline : downlineReducer,
    auth: authReducer,
});


//custom render that includes redux provider
const render = ( ui, {initialState, store = configureStore(combinedReducer, initialState), ...renderOptions} = {}) => {
    const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
