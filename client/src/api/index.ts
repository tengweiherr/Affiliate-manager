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

import { Attachment, CreateAttachment, LoginData } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

const login = async (loginData:LoginData) => {

  const data = await fetch(API_URL + 'user/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData),
  });
  return await data.json();
}

const fetchAttachments = async (referral:string,signal:AbortSignal) => {
  const data = await fetch(API_URL + 'downline/' + referral, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    signal: signal
  });
  return await data.json();
}

const createAttachment = async (attachment:CreateAttachment) => {
  const res = await fetch(API_URL + 'downline/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attachment),
  });
  return await res.json();
    // try {
      // const jsonRes = await res.json();
      // return jsonRes;
      // if (res.status !== 201) {
      //     console.log(jsonRes.message);
      // } else {
      //   console.log(jsonRes.message);
      //   window.location.reload();
      // }
      // } catch (err) {
      //     console.log(err);
      // };
}

const updateAttachment = async (attachment:Attachment) => {
  const res = await fetch(API_URL + 'downline/' + attachment._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attachment),
  });
  return await res.json();
  // try {
  //   const jsonRes = await res.json();
  //   if (res.status !== 200) {
  //     console.log(jsonRes.message);
  //   } else {
  //     console.log(jsonRes.message);
  //     window.location.reload();
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // ;
}

const deleteAttachment = async (attachment:Attachment) => {
  const res = await fetch(API_URL + 'downline/' + attachment._id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
  // try {
  //   const jsonRes = await res.json();
  //   if (res.status !== 200) {
  //     console.log(jsonRes.message);
  //   } else {
  //     console.log(jsonRes.message);
  //     window.location.reload();
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // ;
}

export { fetchAttachments, createAttachment, updateAttachment, deleteAttachment, login }