import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth, UserData } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getUserData();
    console.log('Loaded user data:', data);
    setUserData(data);
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-dark-100' : 'bg-primary'}`}>
      <StatusBar style={darkMode ? "light" : "dark"} />

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
          <Text className={`text-2xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>
            {userData?.firstname && userData?.lastname
              ? `${userData.firstname} ${userData.lastname}`
              : 'Loading...'}
          </Text>
          <Text className={`text-base ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>
            Community Member
          </Text>
        </View>

        {/* Profile Info */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-4`}>Personal Information</Text>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>Username</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>
              {userData?.username || 'N/A'}
            </Text>
          </View>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>Country</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>
              {userData?.country || 'N/A'}
            </Text>
          </View>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>Parish</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>
              {userData?.parish || 'N/A'}
            </Text>
          </View>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>City</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>
              {userData?.city || 'N/A'}
            </Text>
          </View>

          <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3`}>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-1`}>Community</Text>
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>
              {userData?.community || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          className="bg-tertiary rounded-xl py-4 items-center mb-6"
          onPress={() => router.push('/profile-setup')}
        >
          <Text className="text-accent text-lg font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
