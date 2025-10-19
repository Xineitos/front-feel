import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { logout } = useAuth();

  const handleLogout = async () => {
    // Clear authentication state and stored user data
    await logout();
    console.log('Logging out - cleared auth state');

    // Navigate to index (welcome screen) and clear navigation history
    router.replace('/');
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-dark-100' : 'bg-primary'}`}>
      <StatusBar style={darkMode ? "light" : "dark"} />

      {/* Wave Header */}
      <WaveHeader />

      {/* Top Header */}
      <View className="px-6 pt-16 pb-2 flex-row items-center justify-between" style={{ zIndex: 10 }}>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={() => router.back()}
        >
          <Text className={`text-2xl ${darkMode ? 'text-accent' : 'text-dark-100'}`}>←</Text>
        </TouchableOpacity>

        <Text className={`text-xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Profile</Text>

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Profile Picture */}
        <View className="items-center my-6">
          <View className="w-24 h-24 bg-tertiary rounded-full items-center justify-center mb-4">
            <Text className="text-5xl">👤</Text>
          </View>
          <Text className={`text-2xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>John Doe</Text>
          <Text className={`text-base ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Community Member</Text>
        </View>

        {/* Profile Info */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-4`}>Personal Information</Text>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>Username</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>johndoe123</Text>
          </View>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>Phone</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>+1 (876) 123-4567</Text>
          </View>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>Location</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Kingston, Jamaica</Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity className="bg-tertiary rounded-xl py-4 items-center mb-4">
          <Text className="text-accent text-lg font-bold">Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-alert rounded-xl py-4 items-center mb-6"
          onPress={handleLogout}
        >
          <Text className="text-accent font-bold text-lg">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
