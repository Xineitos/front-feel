// Alert Service for FeelSafe App

import { apiService, ApiResponse } from './api.service';
import { authService } from './auth.service';

// Type definitions
export interface Alert {
  id: string;
  type: 'community' | 'parish' | 'urgency' | 'panic' | 'criminal';
  title: string;
  message: string;
  location: {
    country: string;
    parish: string;
    city: string;
    community: string;
    latitude?: number;
    longitude?: number;
  };
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  createdBy: {
    id: string;
    name: string;
    userType: 'civilian' | 'authority';
  };
  timestamp: string;
  status: 'active' | 'resolved' | 'expired';
  affectedRadius?: number; // in kilometers
}

export interface CreateAlertRequest {
  type: Alert['type'];
  title: string;
  message: string;
  urgencyLevel: Alert['urgencyLevel'];
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface AlertFilters {
  type?: Alert['type'];
  parish?: string;
  city?: string;
  community?: string;
  urgencyLevel?: Alert['urgencyLevel'];
  status?: Alert['status'];
  startDate?: string;
  endDate?: string;
}

class AlertService {
  /**
   * Get all alerts with optional filters
   */
  async getAlerts(filters?: AlertFilters): Promise<ApiResponse<Alert[]>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    // Build query string from filters
    let endpoint = '/alerts';
    if (filters) {
      const params = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value !== undefined)
      );
      endpoint += `?${params.toString()}`;
    }

    return await apiService.get<Alert[]>(endpoint, token);
  }

  /**
   * Get alerts by location
   */
  async getAlertsByLocation(
    parish: string,
    city?: string,
    community?: string
  ): Promise<ApiResponse<Alert[]>> {
    const filters: AlertFilters = { parish, city, community };
    return await this.getAlerts(filters);
  }

  /**
   * Get alert by ID
   */
  async getAlertById(id: string): Promise<ApiResponse<Alert>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    return await apiService.get<Alert>(`/alerts/${id}`, token);
  }

  /**
   * Create new alert
   */
  async createAlert(alertData: CreateAlertRequest): Promise<ApiResponse<Alert>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    return await apiService.post<Alert>('/alerts', alertData, token);
  }

  /**
   * Update alert status (for authorities)
   */
  async updateAlertStatus(
    alertId: string,
    status: Alert['status']
  ): Promise<ApiResponse<Alert>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    return await apiService.patch<Alert>(`/alerts/${alertId}/status`, { status }, token);
  }

  /**
   * Delete alert (creator or authority only)
   */
  async deleteAlert(alertId: string): Promise<ApiResponse<any>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    return await apiService.delete(`/alerts/${alertId}`, token);
  }

  /**
   * Get user's created alerts
   */
  async getMyAlerts(): Promise<ApiResponse<Alert[]>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    return await apiService.get<Alert[]>('/alerts/my-alerts', token);
  }

  /**
   * Report false alert
   */
  async reportAlert(alertId: string, reason: string): Promise<ApiResponse<any>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    return await apiService.post(`/alerts/${alertId}/report`, { reason }, token);
  }

  /**
   * Get alert statistics for a location
   */
  async getAlertStats(parish: string, days: number = 30): Promise<ApiResponse<any>> {
    const token = await authService.getToken();

    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    return await apiService.get(`/alerts/stats?parish=${parish}&days=${days}`, token);
  }
}

export const alertService = new AlertService();
