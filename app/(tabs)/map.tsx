import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../../components/WaveHeader';

interface AlertMarker {
  id: string;
  type: 'community' | 'parish' | 'urgency' | 'panic' | 'criminal';
  title: string;
  message: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  createdBy: string;
  timestamp: string;
}

type AlertType = 'all' | 'community' | 'parish' | 'urgency' | 'panic' | 'criminal';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertMarker | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<AlertType>('all');

  // Mock alert data with coordinates
  const [alerts] = useState<AlertMarker[]>([
    {
      id: '1',
      type: 'panic',
      title: 'Emergency Assistance Needed',
      message: 'Medical emergency at community center',
      location: 'Community Center, Downtown',
      coordinates: { latitude: 18.0179, longitude: -76.8099 }, // Kingston, Jamaica (example)
      urgencyLevel: 'critical',
      createdBy: 'John Doe',
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: '2',
      type: 'criminal',
      title: 'Suspicious Activity Reported',
      message: 'Unknown person lurking near school',
      location: 'Elementary School, North District',
      coordinates: { latitude: 18.0199, longitude: -76.8079 },
      urgencyLevel: 'high',
      createdBy: 'Jane Smith',
      timestamp: new Date(Date.now() - 600000).toISOString(),
    },
    {
      id: '3',
      type: 'community',
      title: 'Road Closure Notice',
      message: 'Main Street closed for repairs',
      location: 'Main Street & 5th Avenue',
      coordinates: { latitude: 18.0159, longitude: -76.8119 },
      urgencyLevel: 'medium',
      createdBy: 'Mike Johnson',
      timestamp: new Date(Date.now() - 900000).toISOString(),
    },
    {
      id: '4',
      type: 'urgency',
      title: 'Power Outage Alert',
      message: 'Widespread power outage affecting multiple streets',
      location: 'West Side District',
      coordinates: { latitude: 18.0189, longitude: -76.8139 },
      urgencyLevel: 'high',
      createdBy: 'Sarah Williams',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
    },
  ]);

  const handleMarkerPress = (alert: AlertMarker) => {
    setSelectedAlert(alert);
    setModalVisible(true);
  };

  const handleRefresh = () => {
    console.log('Refreshing map...');
    // Re-center map to user's location or reload alerts
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: 18.0179,
        longitude: -76.8099,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const getFilteredAlerts = () => {
    if (activeFilter === 'all') return alerts;
    return alerts.filter(alert => alert.type === activeFilter);
  };

  const getMarkerColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'critical': return '#D50A0A'; // Red
      case 'high': return '#FF7900'; // Orange
      case 'medium': return '#005d9e'; // Blue
      default: return '#b1babf'; // Gray
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'panic': return '🚨';
      case 'criminal': return '⚠️';
      case 'urgency': return '❗';
      case 'community': return '🏘️';
      case 'parish': return '📍';
      default: return '🔔';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="dark" />

      {/* Wave Header */}
      <WaveHeader />

      {/* Top Header with Logo and Refresh */}
      <View className="px-6 pt-16 pb-2 flex-row items-center justify-between" style={{ zIndex: 10 }}>
        {/* Refresh Button */}
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center bg-tertiary rounded-full"
          onPress={handleRefresh}
        >
          <Text className="text-xl text-accent">🔄</Text>
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../../assets/images/FeelSafeLogo.png')}
          className="w-16 h-16"
          resizeMode="contain"
        />

        {/* Placeholder for alignment */}
        <View className="w-10 h-10" />
      </View>

      {/* Filter Buttons */}
      <View className="px-4 pb-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'all' ? 'bg-tertiary' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('all')}
          >
            <Text className={`text-sm font-semibold ${
              activeFilter === 'all' ? 'text-accent' : 'text-dark-200'
            }`}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'community' ? 'bg-tertiary' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('community')}
          >
            <Text className={`text-sm font-semibold ${
              activeFilter === 'community' ? 'text-accent' : 'text-dark-200'
            }`}>
              🏘️ Community
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'parish' ? 'bg-tertiary' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('parish')}
          >
            <Text className={`text-sm font-semibold ${
              activeFilter === 'parish' ? 'text-accent' : 'text-dark-200'
            }`}>
              📍 Parish
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'urgency' ? 'bg-tertiary' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('urgency')}
          >
            <Text className={`text-sm font-semibold ${
              activeFilter === 'urgency' ? 'text-accent' : 'text-dark-200'
            }`}>
              ❗ Urgent
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-2 ${
              activeFilter === 'panic' ? 'bg-tertiary' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('panic')}
          >
            <Text className={`text-sm font-semibold ${
              activeFilter === 'panic' ? 'text-accent' : 'text-dark-200'
            }`}>
              🚨 Panic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'criminal' ? 'bg-tertiary' : 'bg-accent border border-light-100'
            }`}
            onPress={() => setActiveFilter('criminal')}
          >
            <Text className={`text-sm font-semibold ${
              activeFilter === 'criminal' ? 'text-accent' : 'text-dark-200'
            }`}>
              ⚠️ Criminal
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Map View */}
      <View className="flex-1">
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          className="flex-1"
          initialRegion={{
            latitude: 18.0179,
            longitude: -76.8099,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
          showsMyLocationButton
        >
          {getFilteredAlerts().map((alert) => (
            <Marker
              key={alert.id}
              coordinate={alert.coordinates}
              onPress={() => handleMarkerPress(alert)}
              pinColor={getMarkerColor(alert.urgencyLevel)}
            >
              <View className="items-center">
                <View
                  style={{
                    backgroundColor: getMarkerColor(alert.urgencyLevel),
                    padding: 8,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                  }}
                >
                  <Text className="text-xl">{getAlertIcon(alert.type)}</Text>
                </View>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Alert Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-accent rounded-t-3xl p-6 shadow-lg">
            {selectedAlert && (
              <>
                {/* Modal Header */}
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1 mr-4">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-3xl mr-2">{getAlertIcon(selectedAlert.type)}</Text>
                      <Text className="text-2xl font-bold text-dark-100 flex-1">
                        {selectedAlert.title}
                      </Text>
                    </View>
                    <View
                      className="self-start px-3 py-1 rounded-full"
                      style={{ backgroundColor: getMarkerColor(selectedAlert.urgencyLevel) }}
                    >
                      <Text className="text-xs font-bold text-accent capitalize">
                        {selectedAlert.urgencyLevel} Urgency
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    className="w-8 h-8 rounded-full bg-primary items-center justify-center"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-xl text-dark-100">×</Text>
                  </TouchableOpacity>
                </View>

                {/* Alert Details */}
                <View className="mb-4">
                  <Text className="text-base text-dark-200 mb-4">
                    {selectedAlert.message}
                  </Text>

                  {/* Location */}
                  <View className="flex-row items-center mb-3">
                    <Text className="text-base mr-2">📍</Text>
                    <Text className="text-sm text-dark-200 flex-1">
                      <Text className="font-semibold">Location: </Text>
                      {selectedAlert.location}
                    </Text>
                  </View>

                  {/* User */}
                  <View className="flex-row items-center mb-3">
                    <Text className="text-base mr-2">👤</Text>
                    <Text className="text-sm text-dark-200">
                      <Text className="font-semibold">Created by: </Text>
                      {selectedAlert.createdBy}
                    </Text>
                  </View>

                  {/* Time */}
                  <View className="flex-row items-center">
                    <Text className="text-base mr-2">🕐</Text>
                    <Text className="text-sm text-dark-200">
                      <Text className="font-semibold">Time: </Text>
                      {getTimeAgo(selectedAlert.timestamp)} • {new Date(selectedAlert.timestamp).toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="flex-1 bg-tertiary rounded-xl py-3 items-center"
                    onPress={() => {
                      console.log('Get directions to:', selectedAlert.location);
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-accent font-bold">Get Directions</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 bg-primary border border-tertiary rounded-xl py-3 items-center"
                    onPress={() => {
                      console.log('View details for:', selectedAlert.id);
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-tertiary font-bold">View Details</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
