import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../../components/WaveHeader';
import { websocketService, AlertMessage } from '../../services/websocket.service';
import { useTheme } from '../../contexts/ThemeContext';

type AlertFilter = 'active' | 'closed' | 'responded' | 'myAlerts';
type QuickAccessType = 'community' | 'police' | 'fire' | 'ambulance';

interface AlertWithDistance extends AlertMessage {
  distance?: number; // in kilometers
  submittedBy?: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [alerts, setAlerts] = useState<AlertWithDistance[]>([
    // Mock data for demonstration
    {
      id: '1',
      type: 'panic',
      title: 'Emergency Assistance Needed',
      message: 'Medical emergency at community center',
      urgencyLevel: 'critical',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      distance: 0.5,
      submittedBy: 'John Doe',
    },
    {
      id: '2',
      type: 'criminal',
      title: 'Suspicious Activity Reported',
      message: 'Unknown person lurking near school',
      urgencyLevel: 'high',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      distance: 1.2,
      submittedBy: 'Jane Smith',
    },
    {
      id: '3',
      type: 'community',
      title: 'Road Closure Notice',
      message: 'Main Street closed for repairs',
      urgencyLevel: 'medium',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      distance: 2.8,
      submittedBy: 'Mike Johnson',
    },
  ]);
  const [activeFilter, setActiveFilter] = useState<AlertFilter>('active');

  useEffect(() => {
    // WebSocket connection is optional - app works with mock data
    // Uncomment below when backend is ready

    /*
    const connectWebSocket = async () => {
      try {
        await websocketService.connect({
          url: 'ws://localhost:8080/ws',
          reconnectDelay: 3000,
          maxReconnectAttempts: 5,
        });
      } catch (error) {
        console.log('WebSocket connection failed - using mock data');
      }
    };

    connectWebSocket();

    const unsubscribe = websocketService.subscribe('notifications', (message: AlertMessage) => {
      const newAlert: AlertWithDistance = {
        ...message,
        distance: Math.random() * 5,
        submittedBy: 'Community Member',
      };
      setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => {
      unsubscribe();
      websocketService.disconnect();
    };
    */
  }, []);

  const handleQuickAccess = (type: QuickAccessType) => {
    console.log('Quick access:', type);
    // Navigate to specific alert creation or view
  };

  const getFilteredAlerts = () => {
    let filtered = alerts;

    // Filter by tab
    switch (activeFilter) {
      case 'active':
        filtered = alerts.filter(a => a.urgencyLevel === 'critical' || a.urgencyLevel === 'high');
        break;
      case 'closed':
        // Would filter closed alerts from backend
        filtered = [];
        break;
      case 'responded':
        // Would filter responded alerts from backend
        filtered = [];
        break;
      case 'myAlerts':
        // Would filter user's own alerts from backend
        filtered = alerts.slice(0, 1);
        break;
    }

    return filtered;
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getUrgencyColor = (level?: string) => {
    switch (level) {
      case 'critical': return 'bg-alert';
      case 'high': return 'bg-secondary';
      case 'medium': return 'bg-tertiary';
      default: return 'bg-light-100';
    }
  };

  const renderAlert = ({ item }: { item: AlertWithDistance }) => (
    <TouchableOpacity
      className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-3 border ${darkMode ? 'border-dark-100' : 'border-light-100'}`}
      activeOpacity={0.7}
    >
      {/* Alert Header */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-3">
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>
            {item.title}
          </Text>
          <View className="flex-row items-center">
            <Text className={`text-xs ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>
              By {item.submittedBy} • {getTimeAgo(item.timestamp)}
            </Text>
          </View>
        </View>

        {/* Distance Badge */}
        {item.distance !== undefined && (
          <View className={`${darkMode ? 'bg-dark-100' : 'bg-primary'} px-3 py-1 rounded-full`}>
            <Text className="text-xs font-semibold text-tertiary">
              {item.distance.toFixed(1)} km
            </Text>
          </View>
        )}
      </View>

      {/* Alert Message */}
      <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-3`}>
        {item.message}
      </Text>

      {/* Urgency Indicator */}
      <View className="flex-row items-center">
        <View className={`w-2 h-2 rounded-full mr-2 ${getUrgencyColor(item.urgencyLevel)}`} />
        <Text className={`text-xs ${darkMode ? 'text-light-100' : 'text-dark-200'} capitalize`}>
          {item.urgencyLevel} urgency
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className={`flex-1 ${darkMode ? 'bg-dark-100' : 'bg-primary'}`}>
      <StatusBar style={darkMode ? "light" : "dark"} />

      {/* Wave Header */}
      <WaveHeader />

      {/* Top Header with Menu and Logo */}
      <View className="px-6 pt-16 pb-2 flex-row items-center justify-between" style={{ zIndex: 10 }}>
        {/* Menu Icon */}
        <TouchableOpacity
          className="w-12 h-12 items-center justify-center"
          onPress={() => setMenuVisible(true)}
        >
          <Text className={`text-4xl ${darkMode ? 'text-accent' : 'text-dark-100'}`}>☰</Text>
        </TouchableOpacity>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Logo - Right Aligned */}
        <Image
          source={require('../../assets/images/FeelSafeLogo-Black.png')}
          className="w-16 h-16"
          resizeMode="contain"
        />
      </View>

      {/* Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View className={`${darkMode ? 'bg-dark-100' : 'bg-accent'} rounded-2xl m-6 mt-24 p-6 shadow-lg`}>
            {/* Menu Header */}
            <View className={`mb-6 pb-4 border-b ${darkMode ? 'border-dark-200' : 'border-light-100'}`}>
              <Text className={`text-2xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Menu</Text>
            </View>

            {/* Profile Option */}
            <TouchableOpacity
              className={`flex-row items-center py-4 px-4 ${darkMode ? 'bg-dark-200' : 'bg-primary'} rounded-xl mb-3`}
              onPress={() => {
                setMenuVisible(false);
                router.push('/profile');
              }}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../assets/images/user.png')}
                className="w-8 h-8 mr-4"
                resizeMode="contain"
                style={darkMode ? { tintColor: '#FFFFFF' } : {}}
              />
              <View className="flex-1">
                <Text className={`text-lg font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Profile</Text>
                <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>View and edit your profile</Text>
              </View>
              <Text className={`text-xl ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>›</Text>
            </TouchableOpacity>

            {/* Settings Option */}
            <TouchableOpacity
              className={`flex-row items-center py-4 px-4 ${darkMode ? 'bg-dark-200' : 'bg-primary'} rounded-xl mb-3`}
              onPress={() => {
                setMenuVisible(false);
                router.push('/settings');
              }}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../assets/images/cogwheel.png')}
                className="w-8 h-8 mr-4"
                resizeMode="contain"
                style={darkMode ? { tintColor: '#FFFFFF' } : {}}
              />
              <View className="flex-1">
                <Text className={`text-lg font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Settings</Text>
                <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Manage app preferences</Text>
              </View>
              <Text className={`text-xl ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>›</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity
              className={`mt-4 py-3 rounded-xl border ${darkMode ? 'border-dark-200' : 'border-light-100'}`}
              onPress={() => setMenuVisible(false)}
            >
              <Text className={`text-center ${darkMode ? 'text-light-100' : 'text-dark-200'} font-semibold`}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Quick Access Buttons Container */}
      <View className="px-4 py-4">
        <View
          className="rounded-xl p-4"
          style={{
            backgroundColor: darkMode ? '#2a2a2a' : '#f6f5f5',
            shadowColor: darkMode ? '#FFF' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {/* Create Alert Header */}
          <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-4 text-center`}>CREATE ALERT</Text>

          {/* Quick Access Buttons */}
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-accent rounded-xl p-3 items-center justify-center"
              style={{ width: '23%', borderWidth: 2, borderColor: '#57e77a' }}
              onPress={() => handleQuickAccess('community')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/images/people.png')}
                className="w-10 h-10 mb-1"
                resizeMode="contain"
              />
              <Text className="text-xs font-semibold text-dark-100 text-center">Community</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-accent rounded-xl p-3 items-center justify-center"
              style={{ width: '23%', borderWidth: 2, borderColor: '#005d9e' }}
              onPress={() => handleQuickAccess('police')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/images/police-badge.png')}
                className="w-10 h-10 mb-1"
                resizeMode="contain"
              />
              <Text className="text-xs font-semibold text-dark-100 text-center">Police</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-accent rounded-xl p-3 items-center justify-center"
              style={{ width: '23%', borderWidth: 2, borderColor: '#ff0000' }}
              onPress={() => handleQuickAccess('fire')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/images/shield.png')}
                className="w-10 h-10 mb-1"
                resizeMode="contain"
              />
              <Text className="text-xs font-semibold text-dark-100 text-center">Fire Service</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-accent rounded-xl p-3 items-center justify-center"
              style={{ width: '23%', borderWidth: 2, borderColor: '#8d0790' }}
              onPress={() => handleQuickAccess('ambulance')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/images/ambulance.png')}
                className="w-10 h-10 mb-1"
                resizeMode="contain"
              />
              <Text className="text-xs font-semibold text-dark-100 text-center">Ambulance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Alert Filter Tabs */}
      <View className="px-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'active' ? 'bg-tertiary' : darkMode ? 'bg-dark-200 border border-dark-100' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('active')}
          >
            <Text className={`font-semibold ${
              activeFilter === 'active' ? 'text-accent' : darkMode ? 'text-light-100' : 'text-dark-200'
            }`}>
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'closed' ? 'bg-tertiary' : darkMode ? 'bg-dark-200 border border-dark-100' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('closed')}
          >
            <Text className={`font-semibold ${
              activeFilter === 'closed' ? 'text-accent' : darkMode ? 'text-light-100' : 'text-dark-200'
            }`}>
              Closed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'responded' ? 'bg-tertiary' : darkMode ? 'bg-dark-200 border border-dark-100' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('responded')}
          >
            <Text className={`font-semibold ${
              activeFilter === 'responded' ? 'text-accent' : darkMode ? 'text-light-100' : 'text-dark-200'
            }`}>
              Responded
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'myAlerts' ? 'bg-tertiary' : darkMode ? 'bg-dark-200 border border-dark-100' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('myAlerts')}
          >
            <Text className={`font-semibold ${
              activeFilter === 'myAlerts' ? 'text-accent' : darkMode ? 'text-light-100' : 'text-dark-200'
            }`}>
              My Alerts
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Alerts List */}
      <FlatList
        data={getFilteredAlerts()}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={
          <View className={`${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-light-100'} border rounded-xl p-8 items-center mt-4`}>
            <Text className="text-4xl mb-3">📭</Text>
            <Text className={`text-lg font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-2`}>
              No {activeFilter} alerts
            </Text>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} text-center`}>
              {activeFilter === 'active' && 'All clear in your area'}
              {activeFilter === 'closed' && 'No closed alerts to display'}
              {activeFilter === 'responded' && 'No responded alerts yet'}
              {activeFilter === 'myAlerts' && 'You haven\'t created any alerts'}
            </Text>
          </View>
        }
      />
    </View>
  );
}
