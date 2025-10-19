# React Native API Integration Guide for FeelSafe

## Table of Contents
1. [Understanding APIs](#understanding-apis)
2. [Basic Concepts](#basic-concepts)
3. [Making API Calls in React Native](#making-api-calls)
4. [API Service Architecture](#api-service-architecture)
5. [Practical Examples](#practical-examples)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

---

## Understanding APIs

### What is an API?
An **API (Application Programming Interface)** is a way for your mobile app to communicate with a server/backend. Think of it like a waiter in a restaurant:
- **You (the app)** → Tell the waiter what you want
- **Waiter (the API)** → Takes your request to the kitchen
- **Kitchen (the server)** → Prepares your order
- **Waiter (the API)** → Brings back the response

### Common HTTP Methods
- **GET** - Retrieve data (like getting user profile)
- **POST** - Create new data (like signing up a user)
- **PUT** - Update existing data (like updating profile)
- **DELETE** - Remove data (like deleting an alert)

---

## Basic Concepts

### 1. Request Structure
```
https://api.feelsafe.com/users/login
└─┬─┘ └────────┬──────────┘ └──┬──┘
  │          Domain         Endpoint
Protocol
```

### 2. Request Headers
Headers provide metadata about your request:
```javascript
{
  'Content-Type': 'application/json',  // What type of data you're sending
  'Authorization': 'Bearer token123',   // Authentication token
}
```

### 3. Request Body
The actual data you're sending:
```javascript
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 4. Response
What the server sends back:
```javascript
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "token": "abc123xyz"
  }
}
```

---

## Making API Calls in React Native

### Method 1: Using Fetch (Built-in)

```javascript
// Simple GET request
fetch('https://api.feelsafe.com/alerts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// POST request with body
fetch('https://api.feelsafe.com/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Method 2: Using Async/Await (Recommended)

```javascript
// Cleaner, more readable code
const login = async (email, password) => {
  try {
    const response = await fetch('https://api.feelsafe.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Usage in component
const handleLogin = async () => {
  try {
    const result = await login('user@example.com', 'pass123');
    console.log('Success:', result);
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

---

## API Service Architecture

### Why Create an API Service?
Instead of writing fetch calls everywhere, create a centralized service:
- ✅ Reusable code
- ✅ Easy to maintain
- ✅ Consistent error handling
- ✅ Single place to update base URL

### Basic API Service Structure

```javascript
// services/api.service.js

const BASE_URL = 'https://api.feelsafe.com';

class ApiService {
  // Helper method for making requests
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // PUT request
  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
```

---

## Practical Examples

### Example 1: User Authentication

```javascript
// services/auth.service.js
import { apiService } from './api.service';

export const authService = {
  // Login
  async login(email, password) {
    const response = await apiService.post('/auth/login', {
      email,
      password,
    });
    return response;
  },

  // Sign up
  async signup(userData) {
    const response = await apiService.post('/auth/signup', userData);
    return response;
  },

  // Get current user
  async getCurrentUser(token) {
    const response = await apiService.get('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  },
};
```

### Example 2: Alert Management

```javascript
// services/alert.service.js
import { apiService } from './api.service';

export const alertService = {
  // Get all alerts
  async getAlerts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/alerts?${queryParams}`;
    return await apiService.get(endpoint);
  },

  // Get alerts by location
  async getAlertsByLocation(parish, community) {
    return await apiService.get(
      `/alerts?parish=${parish}&community=${community}`
    );
  },

  // Create new alert
  async createAlert(alertData) {
    return await apiService.post('/alerts', alertData);
  },

  // Get alert by ID
  async getAlertById(id) {
    return await apiService.get(`/alerts/${id}`);
  },
};
```

### Example 3: Using in a Component

```javascript
// In your login.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/auth.service';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(email, password);

      // Save token (we'll cover this in storage section)
      await AsyncStorage.setItem('authToken', response.token);

      // Navigate to next screen
      router.push('/home');

    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... your UI code
    <TouchableOpacity
      onPress={handleLogin}
      disabled={loading}
    >
      <Text>{loading ? 'Logging in...' : 'Sign In'}</Text>
    </TouchableOpacity>
  );
}
```

---

## Error Handling

### 1. Network Errors
```javascript
try {
  const response = await fetch(url);
  // ...
} catch (error) {
  if (error.message === 'Network request failed') {
    Alert.alert('No Internet', 'Please check your connection');
  }
}
```

### 2. HTTP Status Codes
```javascript
const response = await fetch(url);

if (response.status === 401) {
  // Unauthorized - redirect to login
  router.push('/login');
} else if (response.status === 404) {
  // Not found
  Alert.alert('Not Found', 'Resource does not exist');
} else if (response.status === 500) {
  // Server error
  Alert.alert('Server Error', 'Please try again later');
}
```

### 3. Timeout Handling
```javascript
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
```

---

## Best Practices

### 1. Use Environment Variables
```javascript
// config/api.config.js
export const API_CONFIG = {
  BASE_URL: __DEV__
    ? 'http://localhost:8080'  // Development
    : 'https://api.feelsafe.com',  // Production
  TIMEOUT: 10000,
};
```

### 2. Store Authentication Tokens
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token
await AsyncStorage.setItem('authToken', token);

// Get token
const token = await AsyncStorage.getItem('authToken');

// Remove token (logout)
await AsyncStorage.removeItem('authToken');
```

### 3. Add Loading States
```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await apiService.get('/alerts');
    setAlerts(data);
  } catch (error) {
    Alert.alert('Error', error.message);
  } finally {
    setLoading(false);  // Always runs
  }
};
```

### 4. Use TypeScript for Type Safety
```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

async login(data: LoginRequest): Promise<LoginResponse> {
  return await apiService.post('/auth/login', data);
}
```

### 5. Implement Retry Logic
```javascript
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

---

## Testing APIs

### Using Postman
1. Download Postman (free tool)
2. Create a new request
3. Set method (GET, POST, etc.)
4. Enter URL: `http://localhost:8080/api/login`
5. Add headers and body
6. Click Send
7. View response

### Using Browser Console
```javascript
fetch('http://localhost:8080/api/alerts')
  .then(r => r.json())
  .then(console.log);
```

---

## Common Mistakes to Avoid

❌ **Don't** hardcode URLs everywhere
✅ **Do** use a centralized API service

❌ **Don't** forget error handling
✅ **Do** always use try-catch

❌ **Don't** expose sensitive data in requests
✅ **Do** use environment variables

❌ **Don't** block UI during API calls
✅ **Do** show loading indicators

❌ **Don't** forget to handle network failures
✅ **Do** check for connectivity

---

## Next Steps

1. ✅ Create your API service layer
2. ✅ Set up authentication endpoints
3. ✅ Implement error handling
4. ✅ Add loading states to UI
5. ✅ Test with your backend
6. ✅ Store tokens securely
7. ✅ Add offline support

---

## Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Native Networking](https://reactnative.dev/docs/network)
- [Axios Library (Alternative to Fetch)](https://axios-http.com/)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
