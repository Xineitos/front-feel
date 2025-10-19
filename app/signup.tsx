import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Switch } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';

export default function SignUpScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [parish, setParish] = useState('');
  const [city, setCity] = useState('');
  const [community, setCommunity] = useState('');
  const [comalerts, setComalerts] = useState(true);
  const [panicalerts, setPanicalerts] = useState(true);
  const [urgentalerts, setUrgentalerts] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = () => {
    // Validation
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      console.log('Must agree to terms');
      return;
    }
    if (!firstname || !lastname || !username || !password || !country || !parish || !city || !community) {
      console.log('Please fill in all required fields');
      return;
    }

    const signUpData = {
      firstname,
      lastname,
      username,
      password,
      country,
      parish,
      city,
      community,
      comalerts,
      panicalerts,
      urgentalerts,
    };

    console.log('Sign up attempt:', signUpData);

    // TODO: Replace with actual API call
    // For now, navigate to alert setup
    router.replace('/alert-setup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="flex-grow"
        className={darkMode ? 'bg-dark-100' : 'bg-primary'}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style={darkMode ? "light" : "dark"} />

        {/* Wave Header */}
        <WaveHeader />

        <View className="flex-1 justify-center px-8 py-12">
          {/* Header */}
          <View className="mb-8">
            <Text className={`text-4xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-2`}>Create Account</Text>
            <Text className={`text-lg ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Join your community alert network</Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            {/* Personal Information Section */}
            <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-3`}>Personal Information</Text>

            {/* First Name Input */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>First Name *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your first name"
                placeholderTextColor="#b1babf"
                value={firstname}
                onChangeText={setFirstname}
                autoCapitalize="words"
              />
            </View>

            {/* Last Name Input */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Last Name *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your last name"
                placeholderTextColor="#b1babf"
                value={lastname}
                onChangeText={setLastname}
                autoCapitalize="words"
              />
            </View>

            {/* Username Input */}
            <View className="mb-5">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Username *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Choose a username"
                placeholderTextColor="#b1babf"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Password *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Create a password"
                placeholderTextColor="#b1babf"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
            </View>

            {/* Confirm Password Input */}
            <View className="mb-5">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Confirm Password *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Confirm your password"
                placeholderTextColor="#b1babf"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
            </View>

            {/* Location Information Section */}
            <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-3 mt-2`}>Location Information</Text>

            {/* Country */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Country *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your country"
                placeholderTextColor="#b1babf"
                value={country}
                onChangeText={setCountry}
                autoCapitalize="words"
              />
            </View>

            {/* Parish */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Parish *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your parish"
                placeholderTextColor="#b1babf"
                value={parish}
                onChangeText={setParish}
                autoCapitalize="words"
              />
            </View>

            {/* City */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>City/Town *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your city or town"
                placeholderTextColor="#b1babf"
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
              />
            </View>

            {/* Community */}
            <View className="mb-5">
              <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Community/District *</Text>
              <TextInput
                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                placeholder="Enter your community or district"
                placeholderTextColor="#b1babf"
                value={community}
                onChangeText={setCommunity}
                autoCapitalize="words"
              />
            </View>

            {/* Alert Preferences Section */}
            <Text className={`text-lg font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-3 mt-2`}>Alert Preferences</Text>

            {/* Community Alerts Toggle */}
            <View className={`flex-row justify-between items-center mb-4 ${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-light-100'} border rounded-xl px-4 py-4`}>
              <View className="flex-1 mr-3">
                <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Community Alerts</Text>
                <Text className={`text-xs ${darkMode ? 'text-light-100' : 'text-dark-200'} mt-1`}>Receive local community updates</Text>
              </View>
              <Switch
                value={comalerts}
                onValueChange={setComalerts}
                trackColor={{ false: '#b1babf', true: '#005d9e' }}
                thumbColor={comalerts ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            {/* Panic Alerts Toggle */}
            <View className={`flex-row justify-between items-center mb-4 ${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-light-100'} border rounded-xl px-4 py-4`}>
              <View className="flex-1 mr-3">
                <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Panic Alerts</Text>
                <Text className={`text-xs ${darkMode ? 'text-light-100' : 'text-dark-200'} mt-1`}>Emergency panic button notifications</Text>
              </View>
              <Switch
                value={panicalerts}
                onValueChange={setPanicalerts}
                trackColor={{ false: '#b1babf', true: '#D50A0A' }}
                thumbColor={panicalerts ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            {/* Urgent Alerts Toggle */}
            <View className={`flex-row justify-between items-center mb-5 ${darkMode ? 'bg-dark-200 border-dark-100' : 'bg-accent border-light-100'} border rounded-xl px-4 py-4`}>
              <View className="flex-1 mr-3">
                <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'}`}>Urgent Alerts</Text>
                <Text className={`text-xs ${darkMode ? 'text-light-100' : 'text-dark-200'} mt-1`}>Critical time-sensitive notifications</Text>
              </View>
              <Switch
                value={urgentalerts}
                onValueChange={setUrgentalerts}
                trackColor={{ false: '#b1babf', true: '#FF7900' }}
                thumbColor={urgentalerts ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              className="flex-row items-center mb-6"
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              activeOpacity={0.7}
            >
              <View className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${agreedToTerms ? 'bg-alert border-alert' : darkMode ? 'border-dark-100 bg-dark-200' : 'border-light-100 bg-accent'}`}>
                {agreedToTerms && <Text className="text-accent text-xs font-bold">✓</Text>}
              </View>
              <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'} flex-1`}>
                I agree to the{' '}
                <Text className="text-alert font-medium">Terms of Service</Text>
                {' '}and{' '}
                <Text className="text-alert font-medium">Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-tertiary rounded-xl py-4 items-center shadow-lg mb-8"
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text className="text-accent text-lg font-bold">Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className={`${darkMode ? 'text-light-100' : 'text-dark-200'} text-base`}>Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-alert font-bold text-base">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
