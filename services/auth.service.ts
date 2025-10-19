// Authentication Service for FeelSafe App

import { apiService, ApiResponse } from './api.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type definitions
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    userType?: 'civilian' | 'authority';
    location?: {
      country: string;
      parish: string;
      city: string;
      community: string;
    };
  };
  isFirstLogin: boolean;
}

export interface UserProfile {
  country: string;
  parish: string;
  city: string;
  community: string;
  userType: 'civilian' | 'authority';
}

export interface AlertPreferences {
  alertTypes: string[];
  notificationPrefs: {
    vibration: boolean;
    sound: boolean;
    silent: boolean;
  };
}

const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);

    // If login successful, save token and user data
    if (response.success && response.data) {
      await this.saveAuthData(response.data.token, response.data.user);
    }

    return response;
  }

  /**
   * Sign up new user
   */
  async signup(userData: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>('/auth/signup', userData);

    // If signup successful, save token and user data
    if (response.success && response.data) {
      await this.saveAuthData(response.data.token, response.data.user);
    }

    return response;
  }

  /**
   * Complete user profile (first-time setup)
   */
  async completeProfile(
    profileData: UserProfile,
    alertPrefs: AlertPreferences
  ): Promise<ApiResponse<any>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        error: 'No authentication token',
        message: 'Please login again',
      };
    }

    const response = await apiService.post(
      '/auth/complete-profile',
      {
        profile: profileData,
        preferences: alertPrefs,
      },
      token
    );

    return response;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        error: 'No authentication token',
        message: 'Please login',
      };
    }

    const response = await apiService.get<AuthResponse['user']>('/auth/me', token);
    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  /**
   * Get stored auth token
   */
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }

  /**
   * Get stored user data
   */
  async getUserData(): Promise<AuthResponse['user'] | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get user data error:', error);
      return null;
    }
  }

  /**
   * Save authentication data to storage
   */
  private async saveAuthData(token: string, user: AuthResponse['user']): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        [TOKEN_KEY, token],
        [USER_KEY, JSON.stringify(user)],
      ]);
    } catch (error) {
      console.error('Save auth data error:', error);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<ApiResponse<any>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        error: 'No authentication token',
      };
    }

    return await apiService.put('/auth/profile', updates, token);
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<any>> {
    const token = await this.getToken();

    if (!token) {
      return {
        success: false,
        error: 'No authentication token',
      };
    }

    return await apiService.post(
      '/auth/change-password',
      { currentPassword, newPassword },
      token
    );
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<ApiResponse<any>> {
    return await apiService.post('/auth/forgot-password', { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<any>> {
    return await apiService.post('/auth/reset-password', {
      token,
      newPassword,
    });
  }
}

export const authService = new AuthService();
