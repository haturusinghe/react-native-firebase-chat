import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ACCESS_TOKEN} from '../../constants';
// @ts-ignore
import {BASE_URL} from '@env';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000 * 2,
});

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

http.interceptors.request.use(async (config: any) => {
  config.headers.authorization = `Bearer ${
    store?.getState()?.user?.token || (await AsyncStorage.getItem(ACCESS_TOKEN))
  }`;
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
