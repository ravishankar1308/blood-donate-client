import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  // baseURL:'http://6b4845dd.ngrok.io'
  baseURL: 'http://192.168.1.12:8085',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // config.cookies.token = token;
      config.headers.token = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
export default instance;
