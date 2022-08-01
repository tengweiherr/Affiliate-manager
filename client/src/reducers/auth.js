import { LOGIN, LOGOUT } from '../constant/actionTypes';

export default (state = { loginData: null }, action) => {
    switch (action.type) {
        
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, loginData: action?.data };
            
        case LOGOUT:
            localStorage.clear();
            return {...state, loginData: null};
        
        default:
            return state;
    }
}