// Core API Service for FeelSafe App
// This service handles all HTTP requests to the backend

import { Platform } from 'react-native';

// API Configuration
export const API_CONFIG = {
    // Change this to your actual backend URL
    BASE_URL:
        Platform.OS === 'web'
            ? 'http://localhost:8080/api' // Development on web
            : 'http://YOUR_SERVER_IP:8080/api', // Mobile (replace with actual IP)
    TIMEOUT: 10000, // 10 seconds
};

// Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Request options
interface RequestOptions extends RequestInit {
    token?: string;
    timeout?: number;
}

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Core request method with timeout and error handling
     */
    private async request<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        const { token, timeout = API_CONFIG.TIMEOUT, ...fetchOptions } = options;

        // Build URL
        const url = `${this.baseUrl}${endpoint}`;

        // Set up headers as a string-to-string object
        const headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
            ...((fetchOptions.headers as { [key: string]: string }) || {}),
        };

        // Add authorization token if provided
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...fetchOptions,
                headers,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            // Parse response
            const data = await response.json().catch(() => ({}));

            // Check if request was successful
            if (!response.ok) {
                return {
                    success: false,
                    error: (data as any).message || (data as any).error || 'Request failed',
                    message: (data as any).message || 'Something went wrong',
                };
            }

            return {
                success: true,
                data: (data as any).data || data,
                message: (data as any).message,
            };
        } catch (error: any) {
            clearTimeout(timeoutId);

            // Handle different error types
            if (error.name === 'AbortError') {
                return {
                    success: false,
                    error: 'Request timeout',
                    message: 'The request took too long. Please try again.',
                };
            }

            if (error.message === 'Network request failed') {
                return {
                    success: false,
                    error: 'Network error',
                    message: 'Please check your internet connection',
                };
            }

            return {
                success: false,
                error: error.message || 'Unknown error',
                message: 'An unexpected error occurred',
            };
        }
    }

    /** GET request */
    async get<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'GET',
            token,
        });
    }

    /** POST request */
    async post<T>(endpoint: string, body?: any, token?: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            token,
        });
    }

    /** PUT request */
    async put<T>(endpoint: string, body?: any, token?: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            token,
        });
    }

    /** DELETE request */
    async delete<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            token,
        });
    }

    /** PATCH request */
    async patch<T>(endpoint: string, body?: any, token?: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
            token,
        });
    }
}

// Export singleton instance
export const apiService = new ApiService(API_CONFIG.BASE_URL);
