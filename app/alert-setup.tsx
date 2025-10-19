import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../components/WaveHeader';

type AlertType = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

type NotificationPreference = {
  vibration: boolean;
  sound: boolean;
  silent: boolean;
};

export default function AlertSetupScreen() {
  const router = useRouter();

  const [alertTypes, setAlertTypes] = useState<AlertType[]>([
    { id: 'community', label: 'Community Alerts', description: 'Get notified about local community events and updates', enabled: true },
    { id: 'parish', label: 'Parish Alerts', description: 'Receive alerts for your parish area', enabled: true },
    { id: 'urgency', label: 'Urgent Alerts', description: 'Critical and time-sensitive notifications', enabled: true },
    { id: 'panic', label: 'Panic Alerts', description: 'Emergency panic button alerts from nearby users', enabled: true },
  ]);

  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreference>({
    vibration: true,
    sound: true,
    silent: false,
  });

  const toggleAlertType = (id: string) => {
    setAlertTypes(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  const toggleNotificationPref = (key: keyof NotificationPreference) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleContinue = () => {
    // Save alert configuration and navigate to profile setup
    const config = {
      alertTypes: alertTypes.filter(a => a.enabled).map(a => a.id),
      notificationPrefs,
    };
    console.log('Alert Configuration:', config);
    router.push('/profile-setup');
  };

  const handleSkip = () => {
    // Skip to profile setup with default settings
    router.push('/profile-setup');
  };

  return (
    <ScrollView className="flex-1 bg-primary">
      <StatusBar style="dark" />

      {/* Wave Header */}
      <WaveHeader />

      <View className="px-6 py-12">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-dark-100 mb-2">Alert Preferences</Text>
          <Text className="text-base text-dark-200">
            Customize what alerts you want to receive and how you'd like to be notified
          </Text>
        </View>

        {/* Alert Types Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-dark-100 mb-4">Alert Types</Text>
          <Text className="text-sm text-dark-200 mb-4">
            Select the types of alerts you want to receive
          </Text>

          {alertTypes.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              className={`bg-accent border rounded-xl p-4 mb-3 ${
                alert.enabled ? 'border-tertiary' : 'border-light-100'
              }`}
              onPress={() => toggleAlertType(alert.id)}
              activeOpacity={0.7}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1 mr-4">
                  <Text className="text-base font-semibold text-dark-100 mb-1">
                    {alert.label}
                  </Text>
                  <Text className="text-sm text-dark-200">
                    {alert.description}
                  </Text>
                </View>
                <View className={`w-6 h-6 rounded border-2 items-center justify-center ${
                  alert.enabled ? 'bg-tertiary border-tertiary' : 'border-light-100 bg-accent'
                }`}>
                  {alert.enabled && <Text className="text-accent text-xs font-bold">✓</Text>}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notification Preferences Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-dark-100 mb-4">Notification Style</Text>
          <Text className="text-sm text-dark-200 mb-4">
            Choose how you want to be notified
          </Text>

          {/* Vibration */}
          <View className="bg-accent border border-light-100 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-semibold text-dark-100 mb-1">Vibration</Text>
              <Text className="text-sm text-dark-200">Device will vibrate for alerts</Text>
            </View>
            <Switch
              value={notificationPrefs.vibration}
              onValueChange={() => toggleNotificationPref('vibration')}
              trackColor={{ false: '#b1babf', true: '#005d9e' }}
              thumbColor={notificationPrefs.vibration ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>

          {/* Sound */}
          <View className="bg-accent border border-light-100 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-semibold text-dark-100 mb-1">Alert Sound</Text>
              <Text className="text-sm text-dark-200">Play notification sound</Text>
            </View>
            <Switch
              value={notificationPrefs.sound}
              onValueChange={() => toggleNotificationPref('sound')}
              trackColor={{ false: '#b1babf', true: '#005d9e' }}
              thumbColor={notificationPrefs.sound ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>

          {/* Silent */}
          <View className="bg-accent border border-light-100 rounded-xl p-4 mb-3 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-semibold text-dark-100 mb-1">Silent Mode</Text>
              <Text className="text-sm text-dark-200">Only visual notifications</Text>
            </View>
            <Switch
              value={notificationPrefs.silent}
              onValueChange={() => toggleNotificationPref('silent')}
              trackColor={{ false: '#b1babf', true: '#005d9e' }}
              thumbColor={notificationPrefs.silent ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mb-6">
          <TouchableOpacity
            className="bg-tertiary rounded-xl py-4 items-center mb-3 shadow-lg"
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text className="text-accent text-lg font-bold">Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-accent border border-light-100 rounded-xl py-4 items-center"
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text className="text-dark-200 text-base font-semibold">Skip for Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
