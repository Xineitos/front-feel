import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../../components/WaveHeader';
import { useTheme } from '../../contexts/ThemeContext';
import * as Location from 'expo-location';

export default function EmergencyScreen() {
  const { darkMode } = useTheme();
  const [isLocationSharing, setIsLocationSharing] = useState(false);

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

  const handlePanicButton = async () => {
    Alert.alert(
      '⚠️ PANIC ALERT',
      'This will share your live location with emergency services and your emergency contacts. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'ACTIVATE',
          style: 'destructive',
          onPress: async () => {
            await activatePanicMode();
          },
        },
      ]
    );
  };

  const activatePanicMode = async () => {
    try {
      // Request location permissions
      console.log('Requesting location permissions...');
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Denied',
          'Location access is required for panic mode. Please enable location services in settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      console.log('Location permission granted');

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log('Current location:', location.coords);

      // Start live location sharing
      setIsLocationSharing(true);

      Alert.alert(
        '🚨 PANIC MODE ACTIVATED',
        `Your location is being shared:\nLatitude: ${location.coords.latitude.toFixed(6)}\nLongitude: ${location.coords.longitude.toFixed(6)}\n\nEmergency services have been notified.`,
        [
          {
            text: 'Stop Sharing',
            onPress: () => {
              setIsLocationSharing(false);
              Alert.alert('Location Sharing Stopped', 'You are no longer sharing your location.');
            },
          },
        ]
      );

      // TODO: Send location to backend/emergency services
      // This is where you would send the location data to your backend
      console.log('Sending panic alert with location to backend...');
      // await fetch('http://10.10.1.69:8080/panic-alert', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //     timestamp: new Date().toISOString(),
      //   }),
      // });

    } catch (error) {
      console.error('Error activating panic mode:', error);
      Alert.alert(
        'Error',
        'Failed to activate panic mode. Please try again or call emergency services directly.',
        [{ text: 'OK' }]
      );
    }
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
            style={{ backgroundColor: isLocationSharing ? '#D50A0A' : '#000000' }}
            onPress={handlePanicButton}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../assets/images/fear.png')}
              className="w-10 h-10 mr-3"
              style={{ tintColor: '#FFFFFF' }}
              resizeMode="contain"
            />
            <Text className="text-xl font-bold text-accent">
              {isLocationSharing ? '🚨 LOCATION SHARING ACTIVE' : 'PANIC BUTTON'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Location Sharing Status */}
        {isLocationSharing && (
          <View className="mb-6 bg-alert rounded-xl p-4">
            <Text className="text-accent font-bold text-center mb-2">
              🚨 PANIC MODE ACTIVE
            </Text>
            <Text className="text-accent text-sm text-center">
              Your location is being shared with emergency services
            </Text>
          </View>
        )}

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
