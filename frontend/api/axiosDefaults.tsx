import axios from 'axios';
import { Platform } from 'react-native';
import { getStorageItemAsync } from '@/hooks/useStorageState';

const baseURL = Platform.OS === 'android' ? `${process.env.EXPO_PUBLIC_ANDROID_URL}` : `${process.env.EXPO_PUBLIC_LOCALHOST_URL}`;

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['content-type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add interceptor to include JWT token in the headers
axiosReq.interceptors.request.use(
    async (config) => {
        const session = await getStorageItemAsync('session')
        if (session) {
            config.headers.Authorization = `Bearer ${session.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { axiosReq };