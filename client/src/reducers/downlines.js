import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constant/actionTypes';

export default (downlines = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...downlines, action.payload];
        case UPDATE:
            return downlines.map((downline) => downline._id === action.payload._id ? action.payload : downline);
        case DELETE:
            return downlines.filter((downline) => downline._id !== action.payload);
        
        default:
            return downlines;
    }
}