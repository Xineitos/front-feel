import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../components/WaveHeader';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="dark" />

      {/* Wave Header */}
      <WaveHeader />

      {/* Top Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={() => router.back()}
        >
          <Text className="text-2xl text-dark-100">←</Text>
        </TouchableOpacity>

        <Text className="text-xl font-bold text-dark-100">Settings</Text>

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Notifications */}
        <View className="mb-6 mt-4">
          <Text className="text-lg font-bold text-dark-100 mb-4">Notifications</Text>

          <View className="bg-accent rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-semibold text-dark-100 mb-1">Push Notifications</Text>
              <Text className="text-sm text-dark-200">Receive alerts and updates</Text>
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
          <Text className="text-lg font-bold text-dark-100 mb-4">Privacy</Text>

          <View className="bg-accent rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-semibold text-dark-100 mb-1">Location Services</Text>
              <Text className="text-sm text-dark-200">Share your location for alerts</Text>
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
          <Text className="text-lg font-bold text-dark-100 mb-4">Appearance</Text>

          <View className="bg-accent rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-semibold text-dark-100 mb-1">Dark Mode</Text>
              <Text className="text-sm text-dark-200">Use dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#b1babf', true: '#005d9e' }}
              thumbColor={darkMode ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Account */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-dark-100 mb-4">Account</Text>

          <TouchableOpacity className="bg-accent rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <Text className="text-base font-semibold text-dark-100">Change Password</Text>
            <Text className="text-xl text-dark-200">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-accent rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <Text className="text-base font-semibold text-dark-100">Alert Preferences</Text>
            <Text className="text-xl text-dark-200">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-alert rounded-xl p-4 items-center">
            <Text className="text-accent font-bold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
