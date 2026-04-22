import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5090/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(async (config) => {
  try {
    const tokens = await AsyncStorage.getItem('tokens');
    if (tokens) {
      const { access_token } = JSON.parse(tokens);
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If error is 401 and we haven't retried yet, try refreshing token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await AsyncStorage.getItem('tokens');
        if (tokens) {
          const { refresh_token } = JSON.parse(tokens);
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken: refresh_token,
          });

          const { access_token, refresh_token: newRefreshToken } = response.data.data;

          await AsyncStorage.setItem('tokens', JSON.stringify({
            access_token,
            refresh_token: newRefreshToken,
          }));

          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and return error
        await AsyncStorage.removeItem('tokens');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
