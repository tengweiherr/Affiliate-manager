import * as api from '../api';
import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constant/actionTypes';

//Actions Creators
export const getDownline = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDownline();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createDownline = (downline) => async (dispatch) => {
    try {
        const { data } = await api.createDownline(downline);
        dispatch({ type: CREATE, payload: data });
        window.location.reload();

    } catch (error) {
        console.log(error);
    }
}

export const updateDownline = (id, downline) => async (dispatch) => {
    try {
        const { data } = await api.updateDownline(id, downline);
        dispatch({ type: UPDATE, payload: data });
        window.location.reload();

    } catch (error) {
        console.log(error);
    }
}

export const deleteDownline = (id) => async (dispatch) => {
    try {
        await api.deleteDownline(id);
        dispatch({ type: DELETE, payload: id });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}
