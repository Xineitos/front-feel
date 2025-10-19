# FeelSafe Alert System Setup Guide

## Overview

The FeelSafe app now includes a comprehensive first-time user setup flow and real-time alert notification system using WebSocket integration.

## User Flow

### 1. First-Time Login Flow
When a user signs in for the first time, they go through:

1. **Login Screen** (`app/login.tsx`)
   - User enters email and password
   - System detects first-time login
   - Redirects to Alert Setup

2. **Alert Configuration** (`app/alert-setup.tsx`)
   - User selects alert types:
     - Community Alerts
     - Parish Alerts
     - Urgent Alerts
     - Panic Alerts
     - Criminal Reports
   - User configures notification preferences:
     - Vibration (on/off)
     - Alert Sound (on/off)
     - Silent Mode (on/off)

3. **Profile Setup** (`app/profile-setup.tsx`)
   - User selects account type:
     - Civilian (community member)
     - Authority (law enforcement)
   - User provides location information:
     - Country
     - Parish
     - City/Town
     - Community/District

4. **Home Screen** (`app/home.tsx`)
   - Real-time alert feed
   - WebSocket connection status
   - Alert notifications with:
     - Alert type icon
     - Title and message
     - Location information
     - Urgency level indicator
     - Timestamp

## WebSocket Integration

### Service Architecture (`services/websocket.service.ts`)

The WebSocket service provides:

- **Real-time connectivity** to backend server
- **Automatic reconnection** with exponential backoff
- **Topic-based subscriptions** for different alert types
- **Message handling** and notification dispatching
- **Error handling** and connection monitoring

### WebSocket Configuration

```typescript
const config = {
  url: 'ws://YOUR_SERVER_IP:8080/ws',
  reconnectDelay: 3000,
  maxReconnectAttempts: 5,
};
```

### Backend Integration

The app expects a WebSocket server running on port 8080 with the following endpoints:

- **Connection URL**: `ws://localhost:8080/ws` (or your server IP)
- **Subscription Topic**: `/topic/notifications`
- **Send Endpoint**: `/app/sendMessage`

### Message Format

Alert messages should follow this structure:

```json
{
  "type": "NOTIFICATION",
  "id": "unique-alert-id",
  "alertType": "panic|criminal|urgency|community|parish",
  "title": "Alert Title",
  "message": "Alert message content",
  "location": {
    "country": "Country Name",
    "parish": "Parish Name",
    "city": "City Name",
    "community": "Community Name"
  },
  "urgencyLevel": "low|medium|high|critical",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

## Data Collection

The system collects and stores:

### User Profile Data
- Country
- Parish
- City/Town
- Community/District
- User Type (Civilian/Authority)

### Alert Preferences
- Enabled alert types (community, parish, urgency, panic, criminal)
- Notification style (vibration, sound, silent)

### Future Extensions
This data can be used to:
- Filter alerts by location
- Route authority alerts to law enforcement
- Track criminal reports by area
- Generate community safety statistics
- Send targeted notifications

## Implementation Notes

### Setting Up Your Backend

1. Update the WebSocket URL in `services/websocket.service.ts`:
   ```typescript
   const wsUrl = Platform.OS === 'web'
     ? 'ws://localhost:8080/ws'
     : 'ws://YOUR_ACTUAL_SERVER_IP:8080/ws';
   ```

2. Your backend should implement:
   - STOMP protocol over WebSocket
   - Topic-based pub/sub messaging
   - User authentication
   - Location-based alert filtering

### Testing WebSocket Connection

The Home screen includes a "Send Test Alert" button for development testing without requiring a backend connection.

### Production Considerations

1. **Security**
   - Use WSS (WebSocket Secure) in production
   - Implement proper authentication tokens
   - Validate all incoming messages

2. **Performance**
   - Implement message throttling
   - Use pagination for alert history
   - Cache user preferences locally

3. **Offline Support**
   - Queue messages when disconnected
   - Store alerts locally
   - Sync when connection restored

## Color Scheme

- Primary Background: #F5F5F5
- Accent: #FFFFFF
- Tertiary (Blue): #005d9e
- Secondary (Orange): #FF7900
- Alert (Red): #D50A0A

## Next Steps

1. Connect to your actual backend WebSocket server
2. Implement authentication logic in login screen
3. Store user preferences in AsyncStorage or backend
4. Add push notification support for background alerts
5. Implement alert history and filtering
6. Add report creation functionality for civilians
7. Create authority dashboard for managing alerts

## Files Created

- `app/alert-setup.tsx` - Alert configuration screen
- `app/profile-setup.tsx` - User profile and location setup
- `app/home.tsx` - Main alert feed with WebSocket integration
- `services/websocket.service.ts` - WebSocket service layer
- Updated `app/login.tsx` - Added first-time login flow
