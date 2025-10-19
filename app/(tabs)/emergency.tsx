import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../../components/WaveHeader';

export default function EmergencyScreen() {
  const handleEmergencyCall = (type: string) => {
    console.log('Emergency call:', type);
    // Implement emergency call functionality
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="dark" />

      {/* Wave Header */}
      <WaveHeader />

      {/* Top Header with Logo */}
      <View className="px-6 pt-16 pb-2 items-center" style={{ zIndex: 10 }}>
        <Image
          source={require('../../assets/images/FeelSafeLogo.png')}
          className="w-16 h-16"
          resizeMode="contain"
        />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Emergency Header */}
        <View className="items-center mb-8 mt-4">
          <View className="w-24 h-24 bg-alert rounded-full items-center justify-center mb-4">
            <Text className="text-5xl">🚨</Text>
          </View>
          <Text className="text-3xl font-bold text-dark-100 mb-2">Emergency Services</Text>
          <Text className="text-base text-dark-200 text-center">
            Quick access to emergency contacts
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View className="mb-6">
          {/* Police */}
          <TouchableOpacity
            className="bg-tertiary rounded-xl p-6 mb-4 flex-row items-center"
            onPress={() => handleEmergencyCall('police')}
            activeOpacity={0.8}
          >
            <Text className="text-4xl mr-4">🚓</Text>
            <View className="flex-1">
              <Text className="text-xl font-bold text-accent mb-1">Police</Text>
              <Text className="text-sm text-accent">Emergency: 911</Text>
            </View>
            <Text className="text-2xl text-accent">→</Text>
          </TouchableOpacity>

          {/* Fire Service */}
          <TouchableOpacity
            className="bg-secondary rounded-xl p-6 mb-4 flex-row items-center"
            onPress={() => handleEmergencyCall('fire')}
            activeOpacity={0.8}
          >
            <Text className="text-4xl mr-4">🚒</Text>
            <View className="flex-1">
              <Text className="text-xl font-bold text-accent mb-1">Fire Service</Text>
              <Text className="text-sm text-accent">Emergency: 911</Text>
            </View>
            <Text className="text-2xl text-accent">→</Text>
          </TouchableOpacity>

          {/* Ambulance */}
          <TouchableOpacity
            className="bg-alert rounded-xl p-6 mb-4 flex-row items-center"
            onPress={() => handleEmergencyCall('ambulance')}
            activeOpacity={0.8}
          >
            <Text className="text-4xl mr-4">🚑</Text>
            <View className="flex-1">
              <Text className="text-xl font-bold text-accent mb-1">Ambulance</Text>
              <Text className="text-sm text-accent">Emergency: 911</Text>
            </View>
            <Text className="text-2xl text-accent">→</Text>
          </TouchableOpacity>

          {/* Panic Button */}
          <TouchableOpacity
            className="bg-dark-100 rounded-xl p-6 flex-row items-center justify-center"
            onPress={() => handleEmergencyCall('panic')}
            activeOpacity={0.8}
          >
            <Text className="text-4xl mr-3">⚠️</Text>
            <Text className="text-xl font-bold text-accent">PANIC BUTTON</Text>
          </TouchableOpacity>
        </View>

        {/* Warning Notice */}
        <View className="bg-accent border border-secondary rounded-xl p-4 mb-6">
          <Text className="text-xs text-dark-200 text-center">
            <Text className="font-bold">⚠️ Important: </Text>
            Use emergency services responsibly. False alarms may result in penalties.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
