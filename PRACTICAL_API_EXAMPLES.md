# Practical API Integration Examples for FeelSafe

This guide shows you exactly how to use the API services in your React Native components.

## Table of Contents
1. [Login Screen Example](#login-screen-example)
2. [Signup Screen Example](#signup-screen-example)
3. [Profile Setup Example](#profile-setup-example)
4. [Alert Setup Example](#alert-setup-example)
5. [Home Screen with Alerts](#home-screen-with-alerts)
6. [Creating Alerts](#creating-alerts)

---

## Login Screen Example

Here's how to integrate the authentication API into your login screen:

```typescript
// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '../services/auth.service';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Call the login API
      const response = await authService.login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response.success) {
        // Show error message from backend
        Alert.alert('Login Failed', response.message || 'Invalid credentials');
        return;
      }

      // Login successful!
      const userData = response.data;

      if (userData?.isFirstLogin) {
        // First-time user - go to setup
        router.replace('/alert-setup');
      } else {
        // Returning user - go to home
        router.replace('/home');
      }

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
```

---

## Signup Screen Example

```typescript
// app/signup.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '../services/auth.service';

export default function SignUpScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.signup({
        fullName: formData.fullName,
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (!response.success) {
        Alert.alert('Signup Failed', response.message || 'Could not create account');
        return;
      }

      // Success! Navigate to alert setup
      Alert.alert(
        'Welcome!',
        'Account created successfully',
        [{ text: 'Continue', onPress: () => router.replace('/alert-setup') }]
      );

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... your form UI
    <TouchableOpacity onPress={handleSignUp} disabled={loading}>
      <Text>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
    </TouchableOpacity>
  );
}
```

---

## Profile Setup Example

```typescript
// app/profile-setup.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    country: '',
    parish: '',
    city: '',
    community: '',
    userType: 'civilian' as 'civilian' | 'authority',
  });
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    // Validation
    if (!profileData.country || !profileData.parish || !profileData.city) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Get saved alert preferences from previous screen
      const alertPrefsString = await AsyncStorage.getItem('alertPreferences');
      const alertPrefs = alertPrefsString
        ? JSON.parse(alertPrefsString)
        : {
            alertTypes: ['community', 'parish', 'urgency', 'panic', 'criminal'],
            notificationPrefs: { vibration: true, sound: true, silent: false },
          };

      // Complete profile with location and preferences
      const response = await authService.completeProfile(profileData, alertPrefs);

      if (!response.success) {
        Alert.alert('Error', response.message || 'Could not save profile');
        return;
      }

      // Clean up temporary storage
      await AsyncStorage.removeItem('alertPreferences');

      // Navigate to home
      Alert.alert(
        'Setup Complete!',
        'Your profile has been set up successfully',
        [{ text: 'Get Started', onPress: () => router.replace('/home') }]
      );

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... your form UI
    <TouchableOpacity onPress={handleComplete} disabled={loading}>
      <Text>{loading ? 'Saving...' : 'Complete Setup'}</Text>
    </TouchableOpacity>
  );
}
```

---

## Alert Setup Example

```typescript
// app/alert-setup.tsx
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlertSetupScreen() {
  const router = useRouter();
  const [alertTypes, setAlertTypes] = useState([
    { id: 'community', enabled: true },
    { id: 'parish', enabled: true },
    { id: 'urgency', enabled: true },
    { id: 'panic', enabled: true },
    { id: 'criminal', enabled: true },
  ]);
  const [notificationPrefs, setNotificationPrefs] = useState({
    vibration: true,
    sound: true,
    silent: false,
  });

  const handleContinue = async () => {
    // Save preferences temporarily
    const preferences = {
      alertTypes: alertTypes.filter(a => a.enabled).map(a => a.id),
      notificationPrefs,
    };

    await AsyncStorage.setItem('alertPreferences', JSON.stringify(preferences));

    // Navigate to profile setup
    router.push('/profile-setup');
  };

  return (
    // ... your UI
    <TouchableOpacity onPress={handleContinue}>
      <Text>Continue</Text>
    </TouchableOpacity>
  );
}
```

---

## Home Screen with Alerts

```typescript
// app/home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native';
import { alertService, Alert as AlertType } from '../services/alert.service';
import { authService } from '../services/auth.service';

export default function HomeScreen() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load alerts when screen mounts
  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      // Get user's location to filter alerts
      const userData = await authService.getUserData();

      if (!userData?.location) {
        Alert.alert('Error', 'Please complete your profile');
        return;
      }

      // Fetch alerts for user's location
      const response = await alertService.getAlertsByLocation(
        userData.location.parish,
        userData.location.city,
        userData.location.community
      );

      if (response.success && response.data) {
        setAlerts(response.data);
      } else {
        Alert.alert('Error', response.message || 'Could not load alerts');
      }

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadAlerts();
  };

  const renderAlert = ({ item }: { item: AlertType }) => (
    <View style={{ padding: 16, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.message}</Text>
      <Text style={{ fontSize: 12, color: '#666' }}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading alerts...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={{ padding: 32, alignItems: 'center' }}>
            <Text>No alerts in your area</Text>
          </View>
        }
      />
    </View>
  );
}
```

---

## Creating Alerts

```typescript
// app/create-alert.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import { useRouter } from 'expo-router';
import { alertService } from '../services/alert.service';

export default function CreateAlertScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: 'community' as any,
    title: '',
    message: '',
    urgencyLevel: 'medium' as any,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await alertService.createAlert({
        type: formData.type,
        title: formData.title,
        message: formData.message,
        urgencyLevel: formData.urgencyLevel,
      });

      if (!response.success) {
        Alert.alert('Error', response.message || 'Could not create alert');
        return;
      }

      Alert.alert(
        'Success',
        'Alert has been broadcast to your community',
        [{ text: 'OK', onPress: () => router.back() }]
      );

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Picker
        selectedValue={formData.type}
        onValueChange={(value) => setFormData({ ...formData, type: value })}
      >
        <Picker.Item label="Community Alert" value="community" />
        <Picker.Item label="Parish Alert" value="parish" />
        <Picker.Item label="Urgent Alert" value="urgency" />
        <Picker.Item label="Panic Alert" value="panic" />
        <Picker.Item label="Criminal Report" value="criminal" />
      </Picker>

      <TextInput
        placeholder="Alert Title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />

      <TextInput
        placeholder="Alert Message"
        value={formData.message}
        onChangeText={(text) => setFormData({ ...formData, message: text })}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity onPress={handleSubmit} disabled={loading}>
        <Text>{loading ? 'Creating...' : 'Create Alert'}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## Quick Tips

### 1. Always Check for Errors
```typescript
const response = await authService.login(credentials);

if (!response.success) {
  // Handle error
  Alert.alert('Error', response.message);
  return;
}

// Continue with success logic
```

### 2. Show Loading States
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await someApiCall();
  } finally {
    setLoading(false);  // Always runs
  }
};
```

### 3. Use Try-Catch
```typescript
try {
  const response = await apiCall();
  // handle success
} catch (error) {
  // handle error
  Alert.alert('Error', error.message);
}
```

### 4. Validate Before Sending
```typescript
if (!email || !password) {
  Alert.alert('Error', 'Fill in all fields');
  return;
}

// Only proceed if validation passes
await authService.login({ email, password });
```

---

## Testing Without Backend

If your backend isn't ready yet, you can test with mock data:

```typescript
// services/mock.service.ts
export const mockAuthService = {
  async login(credentials: any) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock response
    return {
      success: true,
      data: {
        token: 'mock-token-123',
        user: {
          id: '1',
          fullName: 'Test User',
          email: credentials.email,
        },
        isFirstLogin: true,
      },
    };
  },
};
```

Then switch between mock and real service:

```typescript
import { authService } from '../services/auth.service';
import { mockAuthService } from '../services/mock.service';

// Use mock for testing
const auth = __DEV__ ? mockAuthService : authService;
```

---

## Common Issues and Solutions

### Issue: "Network request failed"
**Solution**: Check your API URL and make sure server is running

### Issue: "No authentication token"
**Solution**: User needs to login again

### Issue: "Request timeout"
**Solution**: Server is slow or unreachable, increase timeout or check connection

### Issue: Response is undefined
**Solution**: Check backend is returning data in expected format

---

## Next Steps

1. ✅ Copy the examples above
2. ✅ Update API_CONFIG with your backend URL
3. ✅ Test with Postman first
4. ✅ Implement one screen at a time
5. ✅ Add error handling
6. ✅ Test on real device
