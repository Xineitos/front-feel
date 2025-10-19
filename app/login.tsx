import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../components/WaveHeader';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Login logic will be implemented here
    console.log('Login attempt:', { email, password });

    // TODO: Replace with actual authentication logic
    // For now, simulate first-time login detection
    const isFirstTimeLogin = true; // This should come from your backend

    if (isFirstTimeLogin) {
      // Navigate to alert setup for first-time users
      router.replace('/alert-setup');
    } else {
      // Navigate to home for returning users (use replace to prevent back navigation)
      router.replace('/(tabs)/home');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="flex-1"
        className="bg-primary"
      >
        <StatusBar style="dark" />

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
            <Text className="text-4xl font-bold text-dark-100 mb-2">Welcome</Text>
            <Text className="text-lg text-dark-200">Sign in to stay connected with your community</Text>
          </View>

          {/* Form */}
          <View className="mb-8">
            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-dark-200 mb-2">Email Address</Text>
              <TextInput
                className="bg-accent border border-light-100 rounded-xl px-4 py-4 text-base text-dark-100"
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
              <Text className="text-sm font-medium text-dark-200 mb-2">Password</Text>
              <TextInput
                className="bg-accent border border-light-100 rounded-xl px-4 py-4 text-base text-dark-100"
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
            <Text className="text-dark-200 text-base">Don't have an account? </Text>
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
