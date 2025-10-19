// WebSocket service for real-time alert notifications
// This service connects to the backend WebSocket server using STOMP protocol

import { Platform } from 'react-native';

export interface AlertMessage {
  id: string;
  type: 'community' | 'parish' | 'urgency' | 'panic' | 'criminal';
  title: string;
  message: string;
  location?: {
    country: string;
    parish: string;
    city: string;
    community: string;
  };
  urgencyLevel?: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

export interface WebSocketConfig {
  url: string;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private listeners: Map<string, ((message: AlertMessage) => void)[]> = new Map();
  private isConnecting = false;
  private config: WebSocketConfig | null = null;

  /**
   * Initialize WebSocket connection
   * @param config WebSocket configuration
   */
  connect(config: WebSocketConfig): Promise<void> {
    this.config = config;
    this.maxReconnectAttempts = config.maxReconnectAttempts || 5;
    this.reconnectDelay = config.reconnectDelay || 3000;

    return new Promise((resolve, reject) => {
      if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
        resolve();
        return;
      }

      this.isConnecting = true;

      try {
        // For React Native, we need to use a WebSocket library
        // In this case, we'll use the native WebSocket API
        this.ws = new WebSocket(config.url);

        this.ws.onopen = () => {
          console.log('WebSocket connected successfully');
          this.isConnecting = false;
          this.reconnectAttempts = 0;

          // Send initial subscription message
          this.subscribeToTopics();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnecting = false;
          reject(error);
        };

        this.ws.onclose = (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
          this.isConnecting = false;
          this.handleReconnection();
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  /**
   * Subscribe to notification topics
   */
  private subscribeToTopics() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    // Send STOMP-like subscription message
    const subscribeMessage = {
      type: 'SUBSCRIBE',
      destination: '/topic/notifications',
    };

    this.ws.send(JSON.stringify(subscribeMessage));
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleMessage(data: any) {
    if (data.type === 'NOTIFICATION' || data.type === 'ALERT') {
      const alert: AlertMessage = {
        id: data.id || Date.now().toString(),
        type: data.alertType || 'community',
        title: data.title || 'New Alert',
        message: data.message || data.body,
        location: data.location,
        urgencyLevel: data.urgencyLevel || 'medium',
        timestamp: data.timestamp || new Date().toISOString(),
      };

      this.notifyListeners(alert);
    }
  }

  /**
   * Handle reconnection logic
   */
  private handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    setTimeout(() => {
      if (this.config) {
        this.connect(this.config).catch((error) => {
          console.error('Reconnection failed:', error);
        });
      }
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  /**
   * Send a message through WebSocket
   */
  sendMessage(destination: string, message: any): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    const payload = {
      type: 'SEND',
      destination,
      body: message,
    };

    this.ws.send(JSON.stringify(payload));
  }

  /**
   * Subscribe to alert notifications
   */
  subscribe(topic: string, callback: (message: AlertMessage) => void): () => void {
    if (!this.listeners.has(topic)) {
      this.listeners.set(topic, []);
    }

    const listeners = this.listeners.get(topic)!;
    listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners about new message
   */
  private notifyListeners(message: AlertMessage) {
    // Notify all subscribers
    this.listeners.forEach((callbacks) => {
      callbacks.forEach((callback) => {
        try {
          callback(message);
        } catch (error) {
          console.error('Error in listener callback:', error);
        }
      });
    });
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
    this.reconnectAttempts = 0;
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();

// Helper function to initialize WebSocket with user configuration
export function initializeWebSocket(userId: string, userConfig: any): Promise<void> {
  const wsUrl = Platform.OS === 'web'
    ? 'ws://localhost:8080/ws'  // For web development
    : 'ws://YOUR_SERVER_IP:8080/ws';  // Replace with actual server IP for mobile

  return websocketService.connect({
    url: wsUrl,
    reconnectDelay: 3000,
    maxReconnectAttempts: 5,
  });
}
