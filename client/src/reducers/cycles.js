import { FETCH_ALL_CYCLE, CREATE_CYCLE, DELETE_CYCLE, UPDATE_CYCLE } from '../constant/actionTypes';

export default (cycles = [], action) => {
    switch (action.type) {
        case FETCH_ALL_CYCLE:
            return action.payload;
        case CREATE_CYCLE:
            return [...cycles, action.payload];
        case UPDATE_CYCLE:
            return cycles.map((cycle) => cycle._id === action.payload._id ? action.payload : cycle);
        case DELETE_CYCLE:
            return cycles.filter((cycle) => cycle._id !== action.payload);
        
        default:
            return cycles;
    }
}