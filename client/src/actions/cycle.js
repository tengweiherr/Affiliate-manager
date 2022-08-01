import * as api from '../api';
import { FETCH_ALL_CYCLE, CREATE_CYCLE, DELETE_CYCLE, UPDATE_CYCLE } from '../constant/actionTypes';

//Actions Creators
export const getCycle = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCycle();
        dispatch({ type: FETCH_ALL_CYCLE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createCycle = (cycle) => async (dispatch) => {
    try {
        const { data } = await api.createCycle(cycle);
        dispatch({ type: CREATE_CYCLE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateCycle = (id, cycle) => async (dispatch) => {
    try {
        const { data } = await api.updateCycle(id, cycle);
        dispatch({ type: UPDATE_CYCLE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteCycle = (id) => async (dispatch) => {
    try {
        await api.deleteCycle(id);
        dispatch({ type: DELETE_CYCLE, payload: id });
    } catch (error) {
        console.log(error);
    }
}
