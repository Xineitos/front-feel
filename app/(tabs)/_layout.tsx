import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';



export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#b1babf',
          height: 100,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#005d9e',
        tabBarInactiveTintColor: '#34302B',
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
              <Text style={{ fontSize: 24 }}>🏠</Text>
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
              <Text style={{ fontSize: 24 }}>🗺️</Text>
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
              <Text style={{ fontSize: 22 }}>🚨</Text>
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
