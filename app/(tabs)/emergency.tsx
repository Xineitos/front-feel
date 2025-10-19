import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../../components/WaveHeader';
import { useTheme } from '../../contexts/ThemeContext';

export default function EmergencyScreen() {
  const { darkMode } = useTheme();

  const handleEmergencyCall = (phoneNumber: string, serviceName: string) => {
    Alert.alert(
      `Call ${serviceName}?`,
      `Do you want to call ${phoneNumber}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ]
    );
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-dark-100' : 'bg-primary'}`}>
      <StatusBar style={darkMode ? "light" : "dark"} />

      {/* Wave Header */}
      <WaveHeader />

      <ScrollView className="flex-1 px-6">
        {/* Emergency Header */}
        <View className="items-center mb-8 mt-20">
          <View className="w-24 h-24 items-center justify-center mb-4">
            <Image
              source={require('../../assets/images/siren.png')}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>
          <Text className={`text-3xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-2`}>Emergency Services</Text>
          <Text className={`text-base ${darkMode ? 'text-light-100' : 'text-dark-200'} text-center`}>
            Quick access to emergency contacts
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View className="mb-6">
          {/* Police */}
          <TouchableOpacity
            className="rounded-xl p-6 mb-4 flex-row items-center"
            style={{ backgroundColor: darkMode ? '#1a3a4a' : '#cce0f0' }}
            onPress={() => handleEmergencyCall('119', 'Police')}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../assets/images/police-badge.png')}
              className="w-12 h-12 mr-4"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className={`text-xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>Police</Text>
              <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Emergency: 119</Text>
            </View>
            <Text className={`text-2xl ${darkMode ? 'text-accent' : 'text-dark-100'}`}>→</Text>
          </TouchableOpacity>

          {/* Fire Service */}
          <TouchableOpacity
            className="rounded-xl p-6 mb-4 flex-row items-center"
            style={{ backgroundColor: darkMode ? '#4a1a1a' : '#ffcccc' }}
            onPress={() => handleEmergencyCall('110', 'Fire Service')}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../assets/images/shield.png')}
              className="w-12 h-12 mr-4"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className={`text-xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>Fire Service</Text>
              <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Emergency: 110</Text>
            </View>
            <Text className={`text-2xl ${darkMode ? 'text-accent' : 'text-dark-100'}`}>→</Text>
          </TouchableOpacity>

          {/* Ambulance */}
          <TouchableOpacity
            className="rounded-xl p-6 mb-4 flex-row items-center"
            style={{ backgroundColor: darkMode ? '#3a2a3a' : '#e6d4e6' }}
            onPress={() => handleEmergencyCall('110', 'Ambulance')}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../assets/images/ambulance.png')}
              className="w-12 h-12 mr-4"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className={`text-xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>Ambulance</Text>
              <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Emergency: 110</Text>
            </View>
            <Text className={`text-2xl ${darkMode ? 'text-accent' : 'text-dark-100'}`}>→</Text>
          </TouchableOpacity>

          {/* Panic Button */}
          <TouchableOpacity
            className="rounded-xl p-6 flex-row items-center justify-center"
            style={{ backgroundColor: '#000000' }}
            onPress={() => handleEmergencyCall('panic')}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../assets/images/fear.png')}
              className="w-10 h-10 mr-3"
              style={{ tintColor: '#FFFFFF' }}
              resizeMode="contain"
            />
            <Text className="text-xl font-bold text-accent">PANIC BUTTON</Text>
          </TouchableOpacity>
        </View>

        {/* Warning Notice */}
        <View className={`${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-secondary'} border rounded-xl p-4 mb-6`}>
          <Text className={`text-xs ${darkMode ? 'text-light-100' : 'text-dark-200'} text-center`}>
            <Text className="font-bold">⚠️ Important: </Text>
            Use emergency services responsibly. False alarms may result in penalties.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
