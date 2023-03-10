import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ACCESS_TOKEN} from '../../constants';

const http = axios.create({
  baseURL: 'http://10.0.2.2:5000',
  timeout: 30000 * 2,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
http.interceptors.request.use(async (config: any) => {
  config.headers['auth-token'] = await AsyncStorage.getItem(ACCESS_TOKEN);
  return config;
});

http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error.response);
  },
);

export default http;
