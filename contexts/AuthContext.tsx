import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserData = {
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    country?: string;
    parish?: string;
    city?: string;
    community?: string;
    [key: string]: any;
};

type AuthContextType = {
    isAuthenticated: boolean;
    login: (userData: UserData) => Promise<void>;
    logout: () => Promise<void>;
    getUserData: () => Promise<UserData | null>;
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

    const login = async (userData: UserData) => {
        try {
            await AsyncStorage.setItem('authToken', 'logged_in');
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setIsAuthenticated(true);
            console.log('User logged in with data:', userData);
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

    const getUserData = async (): Promise<UserData | null> => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
                return JSON.parse(userDataString);
            }
            return null;
        } catch (error) {
            console.log('Error getting user data:', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getUserData }}>
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