import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req) => {

    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchDownline = () => API.get('/downline');
export const createDownline = (newDownline) => API.post('/downline', newDownline);
export const updateDownline = (id, updatedDownline) => API.patch(`/downline/${id}`, updatedDownline);
export const deleteDownline = (id) => API.delete(`/downline/${id}`);

export const fetchCycle = () => API.get('/cycle');
export const createCycle = (newCycle) => API.post('/cycle', newCycle);
export const updateCycle = (id, updatedCycle) => API.patch(`/cycle/${id}`, updatedCycle);
export const deleteCycle = (id) => API.delete(`/cycle/${id}`);

export const login = ( loginData ) => API.post('/user/login', loginData);