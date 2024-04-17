import axios from 'axios';

axios.defaults.baseURL = `${process.env.EXPO_PUBLIC_API_URL}`;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();