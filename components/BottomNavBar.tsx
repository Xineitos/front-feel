import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

type NavItem = 'home' | 'map' | 'emergency';

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: NavItem) => {
    switch (route) {
      case 'home':
        router.push('/(tabs)/home');
        break;
      case 'map':
        router.push('/(tabs)/map');
        break;
      case 'emergency':
        router.push('/(tabs)/emergency');
        break;
    }
  };

  const isActive = (route: string) => pathname.includes(`/${route}`);

  return (
    <View className="bg-accent border-t border-light-100 flex-row justify-around items-center py-3 px-4">
      {/* Home */}
      <TouchableOpacity
        className="items-center flex-1"
        onPress={() => handleNavigation('home')}
        activeOpacity={0.7}
      >
        <View className={`w-10 h-10 rounded-full items-center justify-center ${
          isActive('home') ? 'bg-tertiary' : ''
        }`}>
          <Text className="text-2xl">🏠</Text>
        </View>
        <Text className={`text-xs mt-1 font-semibold ${
          isActive('home') ? 'text-tertiary' : 'text-dark-200'
        }`}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Map */}
      <TouchableOpacity
        className="items-center flex-1"
        onPress={() => handleNavigation('map')}
        activeOpacity={0.7}
      >
        <View className={`w-10 h-10 rounded-full items-center justify-center ${
          isActive('map') ? 'bg-tertiary' : ''
        }`}>
          <Text className="text-2xl">🗺️</Text>
        </View>
        <Text className={`text-xs mt-1 font-semibold ${
          isActive('map') ? 'text-tertiary' : 'text-dark-200'
        }`}>
          Map
        </Text>
      </TouchableOpacity>

      {/* Emergency */}
      <TouchableOpacity
        className="items-center flex-1"
        onPress={() => handleNavigation('emergency')}
        activeOpacity={0.7}
      >
        <View className={`w-14 h-14 rounded-full items-center justify-center ${
          isActive('emergency') ? 'bg-alert' : 'bg-alert'
        }`}>
          <Text className="text-3xl">🚨</Text>
        </View>
        <Text className={`text-xs mt-1 font-bold ${
          isActive('emergency') ? 'text-alert' : 'text-alert'
        }`}>
          Emergency
        </Text>
      </TouchableOpacity>
    </View>
  );
}
