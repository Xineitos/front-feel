import { View, Text, TouchableOpacity, Image, BackHandler } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import WaveHeader from "../components/WaveHeader";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect } from "react";

export default function Index() {
  const { darkMode } = useTheme();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Block back navigation - do nothing, just prevent default behavior
      return true;
    });

    return () => backHandler.remove();
  }, []);

  return (
    <View className={`flex-1 ${darkMode ? 'bg-dark-100' : 'bg-primary'} justify-center items-center px-8`}>
      <StatusBar style={darkMode ? "light" : "dark"} />

      {/* Wave Effect at Top */}
      <WaveHeader />

      {/* Logo/Title */}
      <View className="mb-12 items-center">
        <View className="flex-row mb-4">
          <Text className="text-5xl font-bold text-tertiary">Feel</Text>
          <Text className="text-5xl font-bold text-secondary">Safe</Text>
        </View>
        <Text className={`text-xl ${darkMode ? 'text-light-100' : 'text-dark-200'} text-center`}>
          Community Alert Network
        </Text>
        <Text className={`text-base ${darkMode ? 'text-light-100' : 'text-dark-200'} text-center mt-2`}>
          Stay connected. Stay safe.
        </Text>
      </View>

      {/* Logo Image */}
      <View className="mb-12">
        <Image
          source={require('../assets/images/FeelSafeLogo.png')}
          className="w-48 h-48"
          resizeMode="contain"
        />
      </View>

      {/* Action Buttons */}
      <View className="w-full">
        <Link href="/login" asChild>
          <TouchableOpacity
            className="bg-tertiary rounded-xl py-4 items-center mb-4 shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="text-accent text-lg font-bold">Sign In</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/signup" asChild>
          <TouchableOpacity
            className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} border-2 border-tertiary rounded-xl py-4 items-center`}
            activeOpacity={0.8}
          >
            <Text
              className="text-lg font-bold"
              style={{ color: darkMode ? '#FFFFFF' : '#005d9e' }}
            >Create Account</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Footer */}
      <View className="absolute bottom-10">
        <Text className="text-sm text-light-100">
          Keeping our community safe together
        </Text>
      </View>
    </View>
  );
}
