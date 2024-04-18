import axios from 'axios';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'android' ? `${process.env.EXPO_PUBLIC_ANDROID_URL}` : `${process.env.EXPO_PUBLIC_LOCALHOST_URL}`;

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['content-type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
