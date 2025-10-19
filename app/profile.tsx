import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../components/WaveHeader';

export default function ProfileScreen() {
  const router = useRouter();

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

        <Text className="text-xl font-bold text-dark-100">Profile</Text>

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Profile Picture */}
        <View className="items-center my-6">
          <View className="w-24 h-24 bg-tertiary rounded-full items-center justify-center mb-4">
            <Text className="text-5xl">👤</Text>
          </View>
          <Text className="text-2xl font-bold text-dark-100">John Doe</Text>
          <Text className="text-base text-dark-200">Community Member</Text>
        </View>

        {/* Profile Info */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-dark-100 mb-4">Personal Information</Text>

          <View className="bg-accent rounded-xl p-4 mb-3">
            <Text className="text-sm text-dark-200 mb-1">Email</Text>
            <Text className="text-base font-semibold text-dark-100">john.doe@example.com</Text>
          </View>

          <View className="bg-accent rounded-xl p-4 mb-3">
            <Text className="text-sm text-dark-200 mb-1">Phone</Text>
            <Text className="text-base font-semibold text-dark-100">+1 (876) 123-4567</Text>
          </View>

          <View className="bg-accent rounded-xl p-4 mb-3">
            <Text className="text-sm text-dark-200 mb-1">Location</Text>
            <Text className="text-base font-semibold text-dark-100">Kingston, Jamaica</Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity className="bg-tertiary rounded-xl py-4 items-center mb-6">
          <Text className="text-accent text-lg font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
