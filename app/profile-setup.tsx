import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import WaveHeader from '../components/WaveHeader';

type UserType = 'civilian' | 'authority';

// List of parishes in Jamaica
const jamaicaParishes = [
    'Clarendon',
    'Hanover',
    'Kingston',
    'Manchester',
    'Portland',
    'Saint Andrew',
    'Saint Ann',
    'Saint Catherine',
    'Saint Elizabeth',
    'Saint James',
    'Saint Mary',
    'Saint Thomas',
    'Trelawny',
    'Westmoreland',
];

export default function ProfileSetupScreen() {
    const router = useRouter();

    // Hardcoded country to Jamaica - no longer using useState for this
    const country = 'Jamaica';
    const [parish, setParish] = useState('');
    const [city, setCity] = useState('');
    const [community, setCommunity] = useState('');
    const [userType, setUserType] = useState<UserType>('civilian');
    const [parishDropdownVisible, setParishDropdownVisible] = useState(false);

    // Function to select a parish from the dropdown
    const selectParish = (selectedParish: string) => {
        setParish(selectedParish);
        setParishDropdownVisible(false);
    };

    const handleComplete = () => {
        const profileData = {
            country, // This will always be 'Jamaica'
            parish,
            city,
            community,
            userType,
        };

        // Validate required fields
        if (!parish || !city || !community) {
            console.log('Please fill in all required fields');
            return;
        }

        console.log('Profile Data:', profileData);

        // Navigate to main app or dashboard
        router.push('/home');
    };

    const selectUserType = (type: UserType) => {
        setUserType(type);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView className="flex-1 bg-primary">
                <StatusBar style="dark" />

                {/* Wave Header */}
                <WaveHeader />

                <View className="px-6 py-12">
                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-3xl font-bold text-dark-100 mb-2">Complete Your Profile</Text>
                        <Text className="text-base text-dark-200">
                            Help us provide you with accurate local alerts by sharing your location details
                        </Text>
                    </View>

                    {/* User Type Selection */}
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-dark-100 mb-3">Account Type</Text>

                        <View className="flex-row gap-3 mb-6">
                            <TouchableOpacity
                                className={`flex-1 border-2 rounded-xl p-4 ${
                                    userType === 'civilian' ? 'border-tertiary bg-tertiary bg-opacity-10' : 'border-light-100 bg-accent'
                                }`}
                                onPress={() => selectUserType('civilian')}
                                activeOpacity={0.7}
                            >
                                <View className="items-center">
                                    <Text className="text-3xl mb-2">ð¤</Text>
                                    <Text className="text-base font-semibold text-dark-100">
                                        Civilian
                                    </Text>
                                    <Text className="text-sm font-medium text-dark-200 text-center mt-1">
                                        Community member
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`flex-1 border-2 rounded-xl p-4 ${
                                    userType === 'authority' ? 'border-tertiary bg-tertiary bg-opacity-10' : 'border-light-100 bg-accent'
                                }`}
                                onPress={() => selectUserType('authority')}
                                activeOpacity={0.7}
                            >
                                <View className="items-center">
                                    <Text className="text-3xl mb-2">ð¡ï¸</Text>
                                    <Text className="text-base font-semibold text-dark-100">
                                        Authority
                                    </Text>
                                    <Text className="text-sm font-medium text-dark-200 text-center mt-1">
                                        Law enforcement
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Location Information */}
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-dark-100 mb-3">Location Information</Text>

                        {/* Country - Hardcoded to Jamaica and made uneditable */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-dark-200 mb-2">Country *</Text>
                            <View className="bg-light-100 border border-light-100 rounded-xl px-4 py-4">
                                <Text className="text-base text-dark-100 font-medium">Jamaica</Text>
                            </View>
                        </View>

                        {/* Parish - Dropdown Menu */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-dark-200 mb-2">Parish *</Text>
                            <TouchableOpacity
                                className="bg-accent border border-light-100 rounded-xl px-4 py-4 flex-row justify-between items-center"
                                onPress={() => setParishDropdownVisible(true)}
                            >
                                <Text className={parish ? "text-base text-dark-100" : "text-base text-gray-400"}>
                                    {parish || "Select a parish"}
                                </Text>
                                <Text className="text-dark-100">â¼</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Parish Selection Modal */}
                        <Modal
                            visible={parishDropdownVisible}
                            transparent={true}
                            animationType="slide"
                            onRequestClose={() => setParishDropdownVisible(false)}
                        >
                            <View className="flex-1 justify-center bg-black/50">
                                <View className="bg-accent mx-6 rounded-xl overflow-hidden">
                                    <View className="px-4 py-3 bg-tertiary">
                                        <Text className="text-lg font-bold text-accent text-center">Select Parish</Text>
                                    </View>

                                    <FlatList
                                        data={jamaicaParishes}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                className="px-4 py-4 border-b border-light-100"
                                                onPress={() => selectParish(item)}
                                            >
                                                <Text className="text-base text-dark-100">{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        style={{ maxHeight: 400 }}
                                    />

                                    <TouchableOpacity
                                        className="px-4 py-3 bg-light-100"
                                        onPress={() => setParishDropdownVisible(false)}
                                    >
                                        <Text className="text-base font-medium text-dark-200 text-center">Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {/* City */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-dark-200 mb-2">City/Town *</Text>
                            <TextInput
                                className="bg-accent border border-light-100 rounded-xl px-4 py-4 text-base text-dark-100"
                                placeholder="Enter your city or town"
                                placeholderTextColor="#b1babf"
                                value={city}
                                onChangeText={setCity}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Community */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-dark-200 mb-2">Community/District *</Text>
                            <TextInput
                                className="bg-accent border border-light-100 rounded-xl px-4 py-4 text-base text-dark-100"
                                placeholder="Enter your community or district"
                                placeholderTextColor="#b1babf"
                                value={community}
                                onChangeText={setCommunity}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

                    {/* Info Note */}
                    <View className="bg-accent border border-secondary rounded-xl p-4 mb-6">
                        <Text className="text-xs text-dark-200">
                            <Text className="font-bold">Note: </Text>
                            This information helps us send you relevant alerts for your specific area.
                            You can update these details anytime in your settings.
                        </Text>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                        className="bg-tertiary rounded-xl py-4 items-center shadow-lg"
                        onPress={handleComplete}
                        activeOpacity={0.8}
                    >
                        <Text className="text-accent text-lg font-bold">Complete Setup</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}