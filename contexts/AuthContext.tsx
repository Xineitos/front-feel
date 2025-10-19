import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!authToken);
    } catch (error) {
      console.log('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  const login = async () => {
    try {
      // TODO: Replace with actual authentication token from API
      await AsyncStorage.setItem('authToken', 'logged_in');
      setIsAuthenticated(true);
      console.log('User logged in');
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      // Clear authentication data
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setIsAuthenticated(false);
      console.log('User logged out - session cleared');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
