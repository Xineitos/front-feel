import { Stack } from "expo-router";
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: false, // Disable swipe back gesture globally
          }}
        >
        {/* Auth Screens */}
        <Stack.Screen name="index" options={{ gestureEnabled: true }} />
        <Stack.Screen name="login" options={{ gestureEnabled: true }} />
        <Stack.Screen name="signup" options={{ gestureEnabled: true }} />

        {/* Onboarding Screens */}
        <Stack.Screen name="alert-setup" options={{ gestureEnabled: false }} />
        <Stack.Screen name="profile-setup" options={{ gestureEnabled: false }} />

        {/* Main App Tabs - Cannot swipe back to auth */}
        <Stack.Screen
          name="(tabs)"
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />

        {/* Other Screens */}
        <Stack.Screen name="profile" options={{ gestureEnabled: true }} />
        <Stack.Screen name="settings" options={{ gestureEnabled: true }} />
      </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
