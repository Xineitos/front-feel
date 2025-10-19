import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';

// Mock data for demonstration
const mockAlertTypeData = [
  { alertType: 'Criminal Activity', total: 45 },
  { alertType: 'Disaster Warning', total: 12 },
  { alertType: 'Anonymous Tip', total: 23 },
  { alertType: 'General Warning', total: 67 },
  { alertType: 'Friendly Reminder', total: 34 },
  { alertType: 'Other', total: 18 },
];

const mockParishData = [
  { parish: 'Kingston', alertType: 'Criminal Activity', total: 15 },
  { parish: 'Kingston', alertType: 'General Warning', total: 22 },
  { parish: 'St. Andrew', alertType: 'Criminal Activity', total: 12 },
  { parish: 'St. Andrew', alertType: 'Disaster Warning', total: 8 },
  { parish: 'St. Catherine', alertType: 'Anonymous Tip', total: 10 },
  { parish: 'St. Catherine', alertType: 'General Warning', total: 18 },
  { parish: 'Manchester', alertType: 'Friendly Reminder', total: 14 },
  { parish: 'Manchester', alertType: 'Criminal Activity', total: 5 },
];

const mockCommunityData = [
  { community: 'New Kingston', alertType: 'Criminal Activity', total: 8 },
  { community: 'New Kingston', alertType: 'General Warning', total: 12 },
  { community: 'Half Way Tree', alertType: 'Criminal Activity', total: 7 },
  { community: 'Half Way Tree', alertType: 'Disaster Warning', total: 4 },
  { community: 'Portmore', alertType: 'Anonymous Tip', total: 6 },
  { community: 'Portmore', alertType: 'General Warning', total: 10 },
  { community: 'Spanish Town', alertType: 'Friendly Reminder', total: 9 },
  { community: 'Spanish Town', alertType: 'Criminal Activity', total: 3 },
];

export default function CommunityStatsScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();

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
          className="text-xl font-bold flex-1 text-center mr-10"
          style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
        >
          Community Statistics
        </Text>

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Table 1: Alert Type and Total Alerts */}
        <View className="mb-6 mt-4">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-3`}>
            Alert Type Statistics
          </Text>
          <View className={`${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-light-100'} border rounded-xl overflow-hidden`}>
            {/* Table Header */}
            <View className={`flex-row ${darkMode ? 'bg-dark-100' : 'bg-tertiary'} p-3 border-b ${darkMode ? 'border-dark-100' : 'border-light-100'}`}>
              <Text className={`flex-1 font-bold ${darkMode ? 'text-accent' : 'text-accent'}`}>Alert Type</Text>
              <Text className={`w-20 font-bold text-right ${darkMode ? 'text-accent' : 'text-accent'}`}>Total</Text>
            </View>
            {/* Table Rows */}
            {mockAlertTypeData.map((item, index) => (
              <View
                key={index}
                className={`flex-row p-3 ${index < mockAlertTypeData.length - 1 ? `border-b ${darkMode ? 'border-dark-100' : 'border-light-100'}` : ''}`}
              >
                <Text className={`flex-1 ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>{item.alertType}</Text>
                <Text className={`w-20 text-right font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>{item.total}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Table 2: Parishes, Alert Type and Total Alerts */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-3`}>
            Parish Statistics
          </Text>
          <View className={`${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-light-100'} border rounded-xl overflow-hidden`}>
            {/* Table Header */}
            <View className={`flex-row ${darkMode ? 'bg-dark-100' : 'bg-tertiary'} p-3 border-b ${darkMode ? 'border-dark-100' : 'border-light-100'}`}>
              <Text className={`flex-1 font-bold ${darkMode ? 'text-accent' : 'text-accent'}`}>Parish</Text>
              <Text className={`flex-1 font-bold ${darkMode ? 'text-accent' : 'text-accent'}`}>Alert Type</Text>
              <Text className={`w-16 font-bold text-right ${darkMode ? 'text-accent' : 'text-accent'}`}>Total</Text>
            </View>
            {/* Table Rows */}
            {mockParishData.map((item, index) => (
              <View
                key={index}
                className={`flex-row p-3 ${index < mockParishData.length - 1 ? `border-b ${darkMode ? 'border-dark-100' : 'border-light-100'}` : ''}`}
              >
                <Text className={`flex-1 ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>{item.parish}</Text>
                <Text className={`flex-1 ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>{item.alertType}</Text>
                <Text className={`w-16 text-right font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>{item.total}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Table 3: Community, Alert Type and Total Alerts */}
        <View className="mb-8">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-3`}>
            Community Statistics
          </Text>
          <View className={`${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-light-100'} border rounded-xl overflow-hidden`}>
            {/* Table Header */}
            <View className={`flex-row ${darkMode ? 'bg-dark-100' : 'bg-tertiary'} p-3 border-b ${darkMode ? 'border-dark-100' : 'border-light-100'}`}>
              <Text className={`flex-1 font-bold ${darkMode ? 'text-accent' : 'text-accent'}`}>Community</Text>
              <Text className={`flex-1 font-bold ${darkMode ? 'text-accent' : 'text-accent'}`}>Alert Type</Text>
              <Text className={`w-16 font-bold text-right ${darkMode ? 'text-accent' : 'text-accent'}`}>Total</Text>
            </View>
            {/* Table Rows */}
            {mockCommunityData.map((item, index) => (
              <View
                key={index}
                className={`flex-row p-3 ${index < mockCommunityData.length - 1 ? `border-b ${darkMode ? 'border-dark-100' : 'border-light-100'}` : ''}`}
              >
                <Text className={`flex-1 ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>{item.community}</Text>
                <Text className={`flex-1 ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>{item.alertType}</Text>
                <Text className={`w-16 text-right font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>{item.total}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
