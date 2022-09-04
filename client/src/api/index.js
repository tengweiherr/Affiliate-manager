// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL;
// const API = axios.create({ baseURL: API_URL });

// API.interceptors.request.use((req) => {

//     if(localStorage.getItem('profile')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// })

// export const fetchDownline = () => API.get('/downline');
// export const createDownline = (newDownline) => API.post('/downline', newDownline);
// export const updateDownline = (id, updatedDownline) => API.patch(`/downline/${id}`, updatedDownline);
// export const deleteDownline = (id) => API.delete(`/downline/${id}`);

// export const fetchCycle = () => API.get('/cycle');
// export const createCycle = (newCycle) => API.post('/cycle', newCycle);
// export const updateCycle = (id, updatedCycle) => API.patch(`/cycle/${id}`, updatedCycle);
// export const deleteCycle = (id) => API.delete(`/cycle/${id}`);

// export const login = ( loginData ) => API.post('/user/login', loginData);

const API_URL = process.env.REACT_APP_API_URL;

const login = (loginData) => {
  return fetch(API_URL + 'user/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData),
  }).then(async res => {
    const jsonRes = await res.json()
    if(res.status === 200) return jsonRes;
    else alert(jsonRes.message);
  })
}

const fetchDownlines = (referral) => {
  return fetch(API_URL + 'downline/' + referral, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json())
}

const createNewDownline = (downline) => {
  return fetch(API_URL + 'downline/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(downline),
  }).then(async res=>{
    try {
      const jsonRes = await res.json();
      if (res.status !== 201) {
          console.log(jsonRes.message);
      } else {
        console.log(jsonRes.message);
        window.location.reload();
      }
      } catch (err) {
          console.log(err);
      };
  })
}

const updateDownline = (downline) => {
  return fetch(API_URL + 'downline/' + downline._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(downline),
  }).then(async res=>{
    try {
      const jsonRes = await res.json();
      if (res.status !== 200) {
          console.log(jsonRes.message);
      } else {
        console.log(jsonRes.message);
        window.location.reload();
      }
      } catch (err) {
          console.log(err);
      };
  })
}

const deleteDownline = (downline) => {
  console.log(downline)
  return fetch(API_URL + 'downline/' + downline._id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async res=>{
    try {
      const jsonRes = await res.json();
      if (res.status !== 200) {
          console.log(jsonRes.message);
      } else {
        console.log(jsonRes.message);
        window.location.reload();
      }
      } catch (err) {
          console.log(err);
      };
  })
}

export { fetchDownlines, createNewDownline, updateDownline, deleteDownline, login }