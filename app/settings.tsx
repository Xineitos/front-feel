import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  const handleLogout = async () => {
    await logout();
    console.log('Logging out - cleared auth state');
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
          <Text
            className="text-2xl"
            style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
          >←</Text>
        </TouchableOpacity>

        <Text
          className="text-xl font-bold"
          style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
        >Settings</Text>

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Notifications */}
        <View className="mb-6 mt-4">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-4`}>Notifications</Text>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3 flex-row justify-between items-center`}>
            <View className="flex-1">
              <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>Push Notifications</Text>
              <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Receive alerts and updates</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#b1babf', true: '#005d9e' }}
              thumbColor={notifications ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Privacy */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-4`}>Privacy</Text>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3 flex-row justify-between items-center`}>
            <View className="flex-1">
              <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>Location Services</Text>
              <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Share your location for alerts</Text>
            </View>
            <Switch
              value={location}
              onValueChange={setLocation}
              trackColor={{ false: '#b1babf', true: '#005d9e' }}
              thumbColor={location ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Appearance */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-4`}>Appearance</Text>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3 flex-row justify-between items-center`}>
            <View className="flex-1">
              <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>Dark Mode</Text>
              <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Use dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={() => toggleDarkMode()}
              trackColor={{ false: '#b1babf', true: '#005d9e' }}
              thumbColor={darkMode ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Account */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-4`}>Account</Text>

          <TouchableOpacity className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3 flex-row justify-between items-center`}>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Change Password</Text>
            <Text className={`text-xl ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3 flex-row justify-between items-center`}
            onPress={() => router.push('/alert-setup')}
          >
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Alert Preferences</Text>
            <Text className={`text-xl ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-alert rounded-xl p-4 items-center mt-2"
            onPress={handleLogout}
          >
            <Text className="text-accent font-bold text-lg">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
