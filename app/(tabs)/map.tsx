import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator, Alert, Image, useColorScheme } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MapStyleElement } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import WaveHeader from '../../components/WaveHeader';

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [mapType, setMapType] = useState('standard'); // 'standard' or 'satellite'
  const mapRef = useRef(null);

  // Dark mode map style
  const darkMapStyle: MapStyleElement[] = [
    {
      "elementType": "geometry",
      "stylers": [{"color": "#212121"}]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#757575"}]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{"color": "#212121"}]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{"color": "#757575"}]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#9e9e9e"}]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#bdbdbd"}]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#757575"}]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{"color": "#181818"}]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#616161"}]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [{"color": "#1b1b1b"}]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#2c2c2c"}]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#8a8a8a"}]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{"color": "#373737"}]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"color": "#3c3c3c"}]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{"color": "#4e4e4e"}]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#616161"}]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#757575"}]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"color": "#000000"}]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#3d3d3d"}]
    }
  ];

  // Light mode map style
  const lightMapStyle: MapStyleElement[] = [
    {
      "elementType": "geometry",
      "stylers": [{"color": "#f5f5f5"}]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{"visibility": "on"}]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#616161"}]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "poi.business",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{"color": "#ffffff"}]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"color": "#dadada"}]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"color": "#c9c9c9"}]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#9e9e9e"}]
    }
  ];

  const requestLocationPermission = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setPermissionDenied(false);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setPermissionDenied(true);
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);

        // Set default region to Kingston, Jamaica
        setRegion({
          latitude: 18.0179,
          longitude: -76.8099,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        return;
      }

      // Get current position
      getLocation();
    } catch (error) {
      console.error('Error requesting permission:', error);
      setErrorMsg('Error requesting location permissions');
      setIsLoading(false);

      // Set default region to Kingston, Jamaica
      setRegion({
        latitude: 18.0179,
        longitude: -76.8099,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const getLocation = async () => {
    try {
      // Show loading indicator
      setIsLoading(true);

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });

      // Update region with user's location
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);
      setIsLoading(false);

      // Center map on user's location if available
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 500);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Could not get your location');
      setIsLoading(false);

      // Set default region to Kingston, Jamaica
      setRegion({
        latitude: 18.0179,
        longitude: -76.8099,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const recenterMap = () => {
    if (region && mapRef.current) {
      mapRef.current.animateToRegion(region, 500);
    }
  };

  const toggleMapStyle = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleMapType = () => {
    setMapType(prev => prev === 'standard' ? 'satellite' : 'standard');
  };

  // Define example points of interest
  const pointsOfInterest = [
    {
      id: '1',
      coordinate: { latitude: 18.0179, longitude: -76.8099 },
      title: 'Kingston',
      description: 'Capital of Jamaica'
    },
    {
      id: '2',
      coordinate: { latitude: region?.latitude ? region.latitude + 0.01 : 18.0279,
                    longitude: region?.longitude ? region.longitude + 0.01 : -76.7999 },
      title: 'Safety Point',
      description: 'Community Safe Zone'
    },
    {
      id: '3',
      coordinate: { latitude: region?.latitude ? region.latitude - 0.008 : 18.0099,
                    longitude: region?.longitude ? region.longitude - 0.005 : -76.8149 },
      title: 'Emergency Station',
      description: 'Police and Medical Assistance'
    }
  ];

  // Create custom marker images for different modes
  const getMarkerColor = (type) => {
    // If in satellite mode, use more visible colors
    if (mapType === 'satellite') {
      return '#ffffff';  // White markers stand out better on satellite imagery
    }
    // Otherwise use theme-based colors
    return isDarkMode ? '#4fc3f7' : '#005d9e';
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      {/* Wave Header */}
      <WaveHeader />

      {/* Map container */}
      <View style={styles.mapContainer}>
        {isLoading && !region && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#005d9e" />
            <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>
              Getting your location...
            </Text>
          </View>
        )}

        {permissionDenied && (
          <View style={styles.permissionContainer}>
            <Image
              source={require('../../assets/images/FeelSafeLogo.png')}
              style={styles.permissionImage}
              resizeMode="contain"
            />
            <Text style={[styles.permissionTitle, isDarkMode && styles.darkText]}>
              Location Permission Required
            </Text>
            <Text style={[styles.permissionText, isDarkMode && styles.darkText]}>
              FeelSafe needs your location to show nearby alerts and provide accurate safety information.
            </Text>
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestLocationPermission}
            >
              <Text style={styles.permissionButtonText}>Allow Location Access</Text>
            </TouchableOpacity>
          </View>
        )}

        {region && (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={true}
            showsScale={true}
            mapType={mapType}
            customMapStyle={mapType === 'standard' ? (isDarkMode ? darkMapStyle : lightMapStyle) : []}
          >
            {/* Points of interest markers */}
            {pointsOfInterest.map(point => (
              <Marker
                key={point.id}
                coordinate={point.coordinate}
                title={point.title}
                description={point.description}
                pinColor={getMarkerColor(point.id)}
              />
            ))}
          </MapView>
        )}

        {/* UI Controls */}
        {region && (
          <View style={styles.controls}>
            {/* Recenter button */}
            <TouchableOpacity
              style={[styles.controlButton, isDarkMode && styles.darkControlButton]}
              onPress={recenterMap}
            >
              <Ionicons name="locate" size={24} color={isDarkMode ? "#fff" : "#005d9e"} />
            </TouchableOpacity>

            {/* Toggle satellite view button */}
            <TouchableOpacity
              style={[styles.controlButton, isDarkMode && styles.darkControlButton]}
              onPress={toggleMapType}
            >
              <Ionicons
                name={mapType === 'standard' ? "earth" : "map"}
                size={24}
                color={isDarkMode ? "#fff" : "#005d9e"}
              />
              <View style={mapType === 'satellite' ? styles.activeDot : styles.inactiveDot} />
            </TouchableOpacity>

            {/* Toggle map style button (only for standard view) */}
            {mapType === 'standard' && (
              <TouchableOpacity
                style={[styles.controlButton, isDarkMode && styles.darkControlButton]}
                onPress={toggleMapStyle}
              >
                <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "#fff" : "#005d9e"} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Map type indicator */}
        {region && (
          <View style={[
            styles.mapTypeIndicator,
            isDarkMode && styles.darkMapTypeIndicator,
            mapType === 'satellite' && styles.satelliteMapTypeIndicator
          ]}>
            <Text style={[
              styles.mapTypeText,
              isDarkMode && styles.darkMapTypeText,
              mapType === 'satellite' && styles.satelliteMapTypeText
            ]}>
              {mapType === 'standard' ? 'Standard View' : 'Satellite View'}
            </Text>
          </View>
        )}

        {/* Error message */}
        {errorMsg && !permissionDenied && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
            <TouchableOpacity
              style={styles.errorButton}
              onPress={requestLocationPermission}
            >
              <Text style={styles.errorButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  darkText: {
    color: '#e0e0e0',
  },
  controls: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    gap: 8,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 8,
  },
  darkControlButton: {
    backgroundColor: '#333333',
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#005d9e',
  },
  inactiveDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  mapTypeIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  darkMapTypeIndicator: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
  },
  satelliteMapTypeIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  mapTypeText: {
    fontSize: 12,
    color: '#005d9e',
    fontWeight: '500',
  },
  darkMapTypeText: {
    color: '#4fc3f7',
  },
  satelliteMapTypeText: {
    color: '#ffffff',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  permissionImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  permissionButton: {
    backgroundColor: '#005d9e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    flex: 1,
  },
  errorButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  errorButtonText: {
    color: '#ff3b30',
    fontWeight: 'bold',
  },
});
