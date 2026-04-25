import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/api';
import { apiEndpoints } from '../lib/endpoints';

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

// Token depolama yardımcısı — AsyncStorage öncelikli, web'de fallback
const tokenStore = {
  get: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('tokens');
    } catch {
      return typeof localStorage !== 'undefined' ? localStorage.getItem('tokens') : null;
    }
  },
  set: async (value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('tokens', value);
    } catch {
      if (typeof localStorage !== 'undefined') localStorage.setItem('tokens', value);
    }
  },
  remove: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('tokens');
    } catch {
      if (typeof localStorage !== 'undefined') localStorage.removeItem('tokens');
    }
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const tokens = await tokenStore.get();
      if (tokens) {
        const { access_token } = JSON.parse(tokens);
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        const response = await api.get<any>(apiEndpoints.auth.me);
        setUser(response.data.data);
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error('Token geri yükleme başarısız:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post<any>(apiEndpoints.auth.login, { email, password });
    const { access_token, refresh_token, user: userData } = response.data.data;

    await tokenStore.set(JSON.stringify({ access_token, refresh_token }));
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setUser(userData);
    setIsSignedIn(true);
  };

  const logout = async () => {
    try {
      await tokenStore.remove();
      api.defaults.headers.common['Authorization'] = '';
      setUser(null);
      setIsSignedIn(false);
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  const refreshToken = async () => {
    try {
      const tokens = await tokenStore.get();
      if (!tokens) throw new Error('Token bulunamadı');

      const { refresh_token } = JSON.parse(tokens);
      const response = await api.post<any>(apiEndpoints.auth.refresh, { refreshToken: refresh_token });
      const { access_token, refresh_token: newRefresh } = response.data.data;

      await tokenStore.set(JSON.stringify({ access_token, refresh_token: newRefresh }));
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
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
