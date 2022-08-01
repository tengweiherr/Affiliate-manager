import * as api from '../api/index.js';
import { LOGIN } from '../constant/actionTypes';

//Actions Creators
export const login = (loginData, history) => async (dispatch) => {
    try {
        const { data } = await api.login(loginData);
        
        dispatch({ type: LOGIN, data });

        history.push('/');

    } catch (error) {
        console.log(error.message);
        alert("Login Failed");
    }
}


