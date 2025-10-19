import { Tabs } from 'expo-router';
import { View, Image } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function TabLayout() {
  const { darkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkMode ? '#1a1a1a' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: darkMode ? '#333333' : '#b1babf',
          height: 100,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#005d9e',
        tabBarInactiveTintColor: darkMode ? '#FFFFFF' : '#34302B',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#005d9e' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={require('../../assets/images/home.png')}
                style={{ width: 24, height: 24, tintColor: focused ? '#FFFFFF' : (darkMode ? '#FFFFFF' : '#34302B') }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#005d9e' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={require('../../assets/images/map.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 35,
              height: 35,
              borderRadius: 24,
              backgroundColor: '#D50A0A',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
              <Image
                source={require('../../assets/images/siren.png')}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#D50A0A',
            marginTop: 4,
          },
        }}
      />
    </Tabs>
  );
}
