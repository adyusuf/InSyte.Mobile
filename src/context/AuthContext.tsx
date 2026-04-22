import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Advisor' | 'SchoolAdmin' | 'Teacher';
  isActive: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if user is already logged in on app start
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');
      if (tokens) {
        const { access_token } = JSON.parse(tokens);
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        
        const response = await api.get<any>('/auth/me');
        setUser(response.data.data);
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error('Failed to restore token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<any>('/auth/login', { email, password });
      const { access_token, refresh_token, user: userData } = response.data.data;
      
      await AsyncStorage.setItem('tokens', JSON.stringify({
        access_token,
        refresh_token,
      }));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(userData);
      setIsSignedIn(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('tokens');
      api.defaults.headers.common['Authorization'] = '';
      setUser(null);
      setIsSignedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshToken = async () => {
    try {
      const tokens = await AsyncStorage.getItem('tokens');
      if (tokens) {
        const { refresh_token } = JSON.parse(tokens);
        const response = await api.post<any>('/auth/refresh', { refreshToken: refresh_token });
        const { access_token, refresh_token: newRefreshToken } = response.data.data;
        
        await AsyncStorage.setItem('tokens', JSON.stringify({
          access_token,
          refresh_token: newRefreshToken,
        }));
        
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      }
    } catch (error) {
      await logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isSignedIn, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
