import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Alert, BackHandler } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
    const router = useRouter();
    const { darkMode } = useTheme();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true); // block back
        return () => backHandler.remove();
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        try {
            const credentials = btoa(`${username}:${password}`);

            const response = await fetch('http://10.10.1.69:8080/accounts/', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                },
            });

            if (response.ok) {
                await login(); // Set auth state
                router.replace('/(tabs)/home');
            } else {
                const text = await response.text();
                console.error('Login failed:', text);
                Alert.alert('Login Failed', 'Invalid username or password.');
            }
        } catch (err) {
            console.error('Login error:', err);
            Alert.alert('Login Failed', 'An error occurred. Check console for details.');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
            <ScrollView contentContainerClassName="flex-1" className={darkMode ? 'bg-dark-100' : 'bg-primary'}>
                <StatusBar style={darkMode ? "light" : "dark"} />

                <WaveHeader />

                <View className="flex-1 justify-center px-8">
                    {/* Logo */}
                    <View className="items-center mb-8">
                        <Image
                            source={require('../assets/images/FeelSafeLogo.png')}
                            className="w-32 h-32"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Header */}
                    <View className="mb-12">
                        <Text className={`text-4xl font-bold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-2`}>Welcome</Text>
                        <Text className={`text-lg ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>Sign in to stay connected with your community</Text>
                    </View>

                    {/* Form */}
                    <View className="mb-8">
                        {/* Username */}
                        <View className="mb-6">
                            <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Username</Text>
                            <TextInput
                                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                                placeholder="Enter your username"
                                placeholderTextColor="#b1babf"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password */}
                        <View className="mb-4">
                            <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>Password</Text>
                            <TextInput
                                className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
                                placeholder="Enter your password"
                                placeholderTextColor="#b1babf"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity className="self-end mb-8">
                            <Text className="text-sm text-alert font-medium">Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            className="bg-tertiary rounded-xl py-4 items-center shadow-lg mb-8"
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text className="text-accent text-lg font-bold">Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up Link */}
                    <View className="flex-row justify-center items-center">
                        <Text className={`${darkMode ? 'text-light-100' : 'text-dark-200'} text-base`}>Don't have an account? </Text>
                        <Link href="/signup" asChild>
                            <TouchableOpacity>
                                <Text className="text-alert font-bold text-base">Sign Up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
