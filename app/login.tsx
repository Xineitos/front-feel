import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, BackHandler } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Prevent back navigation - return true to block the default behavior
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
    // Login logic will be implemented here
    console.log('Login attempt:', { email, password });

    // TODO: Replace with actual authentication logic (API call)
    // For now, just set authentication state
    await login();

    // Navigate to home screen (use replace to prevent back navigation)
    router.replace('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="flex-1"
        className={darkMode ? 'bg-dark-100' : 'bg-primary'}
      >
        <StatusBar style={darkMode ? "light" : "dark"} />

        {/* Wave Header */}
        <WaveHeader />

        <View className="flex-1 justify-center px-8">
          {/* Logo */}
          <View className="items-center mb-8">
            <Image
              source={require('../assets/images/FeelSafeLogo.png')}
              className="w-32 h-32"
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="mb-12">
            <Text className={`text-4xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-2`}>Welcome</Text>
            <Text className={`text-lg ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Sign in to stay connected with your community</Text>
          </View>

          {/* Form */}
          <View className="mb-8">
            {/* Email Input */}
            <View className="mb-6">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Email Address</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your email"
                placeholderTextColor="#b1babf"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Password</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your password"
                placeholderTextColor="#b1babf"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-8">
              <Text className="text-sm text-alert font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-tertiary rounded-xl py-4 items-center shadow-lg mb-8"
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text className="text-accent text-lg font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center">
            <Text className={`${darkMode ? 'text-light-100' : 'text-dark-200'} text-base`}>Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text className="text-alert font-bold text-base">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
