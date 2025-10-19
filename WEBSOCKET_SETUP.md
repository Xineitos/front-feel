# WebSocket Setup Guide

## Current Status
✅ **WebSocket is DISABLED by default** - Your app works perfectly with mock data!

The WebSocket connection error you saw is normal when there's no backend server running. The app is designed to work without it.

---

## How the App Works Now

### Without WebSocket (Current Mode)
- ✅ App shows **mock alert data** (3 sample alerts)
- ✅ All features work (filtering, sorting, map, etc.)
- ✅ No errors or crashes
- ✅ Perfect for development and testing UI

### With WebSocket (When Backend is Ready)
- ✅ Real-time alerts from server
- ✅ Live updates when new alerts are created
- ✅ Multi-user synchronization

---

## Enabling WebSocket

When your backend server is ready, follow these steps:

### Step 1: Start Your Backend Server
Make sure your WebSocket server is running on:
```
ws://localhost:8080/ws
```

### Step 2: Enable WebSocket in Home Screen
Open `app/home.tsx` and find this line (around line 72):
```typescript
// connectWebSocket();
```

**Uncomment it** to:
```typescript
connectWebSocket();
```

### Step 3: That's It!
The app will now connect to your backend and receive real-time alerts.

---

## Changing WebSocket URL

### For Mobile Testing
If testing on a real device, update the URL in `app/home.tsx`:

```typescript
await websocketService.connect({
  url: 'ws://YOUR_COMPUTER_IP:8080/ws',  // Replace with your IP
  reconnectDelay: 3000,
  maxReconnectAttempts: 2,
});
```

### Finding Your IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet" under your active network adapter

**Example:**
If your IP is `192.168.1.100`, use:
```typescript
url: 'ws://192.168.1.100:8080/ws'
```

---

## Testing WebSocket Connection

### 1. Check Backend is Running
Open your browser and go to:
```
http://localhost:8080
```
You should see your backend responding.

### 2. Test WebSocket Endpoint
You can use a WebSocket testing tool like:
- [Postman](https://www.postman.com/) (has WebSocket support)
- [WebSocket King](https://websocketking.com/)
- Browser console:
```javascript
const ws = new WebSocket('ws://localhost:8080/ws');
ws.onopen = () => console.log('Connected!');
ws.onerror = (err) => console.log('Error:', err);
```

### 3. Send Test Alert from Backend
Your backend should send messages in this format:
```json
{
  "type": "NOTIFICATION",
  "id": "123",
  "alertType": "panic",
  "title": "Test Alert",
  "message": "This is a test message",
  "urgencyLevel": "high",
  "timestamp": "2025-01-18T12:00:00Z"
}
```

---

## Troubleshooting

### Error: "WebSocket connection failed"
**Cause:** Backend server is not running
**Solution:** Either start your backend OR leave WebSocket disabled (app works fine without it)

### Error: "Network request failed"
**Cause:** Wrong URL or firewall blocking
**Solution:**
1. Check backend URL is correct
2. Check firewall allows port 8080
3. If on mobile, use your computer's IP instead of localhost

### Error: "Connection timeout"
**Cause:** Backend is slow to respond
**Solution:** Increase `maxReconnectAttempts` or check backend performance

### Mock Data Not Showing
**Cause:** Filter is set to wrong tab
**Solution:** Click "Active" tab to see mock alerts

---

## Current Mock Data

The app includes 3 sample alerts:

1. **Emergency Assistance Needed** (Panic, Critical)
   - 0.5 km away
   - Created by: John Doe

2. **Suspicious Activity Reported** (Criminal, High)
   - 1.2 km away
   - Created by: Jane Smith

3. **Road Closure Notice** (Community, Medium)
   - 2.8 km away
   - Created by: Mike Johnson

---

## Next Steps

1. ✅ **Keep WebSocket disabled** while developing UI
2. ✅ **Build your backend** WebSocket server
3. ✅ **Test backend** with the tools mentioned above
4. ✅ **Enable WebSocket** when backend is ready
5. ✅ **Update URL** if testing on mobile device

---

## Summary

**For Now:**
- Don't worry about the WebSocket error
- App works perfectly with mock data
- Focus on building features

**When Backend is Ready:**
- Uncomment one line
- Get real-time alerts
- Full functionality

The app is designed to work both ways! 🎉
