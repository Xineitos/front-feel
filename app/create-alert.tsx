import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import WaveHeader from '../components/WaveHeader';
import { useTheme } from '../contexts/ThemeContext';
import DropDownPicker from 'react-native-dropdown-picker';

type AlertType = 'Criminal Activity' | 'Disaster Warning' | 'Anonymous Tip' | 'General Warning' | 'Friendly Reminder' | 'Other';

export default function CreateAlertScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [alertTypeOpen, setAlertTypeOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const alertTypes: { label: string; value: AlertType }[] = [
    { label: 'Criminal Activity', value: 'Criminal Activity' },
    { label: 'Disaster Warning', value: 'Disaster Warning' },
    { label: 'Anonymous Tip', value: 'Anonymous Tip' },
    { label: 'General Warning', value: 'General Warning' },
    { label: 'Friendly Reminder', value: 'Friendly Reminder' },
    { label: 'Other', value: 'Other' },
  ];

  const handleSubmitAlert = () => {
    if (!title || !body || !alertType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // TODO: Submit alert to backend
    console.log('Creating alert:', { title, body, alertType, isAnonymous });

    Alert.alert('Success', 'Alert created successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-dark-100' : 'bg-primary'}`}>
      <StatusBar style={darkMode ? "light" : "dark"} />

      {/* Wave Header */}
      <WaveHeader />

      {/* Top Header */}
      <View className="px-6 pt-16 pb-2 flex-row items-center justify-between" style={{ zIndex: 10 }}>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={() => router.back()}
        >
          <Text
            className="text-2xl"
            style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
          >←</Text>
        </TouchableOpacity>

        <View className="flex-1" />

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
        {/* Title Input */}
        <View className="mb-6 mt-4">
          <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>
            Alert Title *
          </Text>
          <TextInput
            className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
            placeholder="Enter alert title"
            placeholderTextColor="#b1babf"
            value={title}
            onChangeText={setTitle}
            autoCapitalize="sentences"
          />
        </View>

        {/* Body/Description Input */}
        <View className="mb-6">
          <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>
            Alert Description *
          </Text>
          <TextInput
            className={`${darkMode ? 'bg-dark-200 border-dark-100 text-accent' : 'bg-accent border-light-100 text-dark-100'} border rounded-xl px-4 py-4 text-base`}
            placeholder="Enter alert description"
            placeholderTextColor="#b1babf"
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            autoCapitalize="sentences"
          />
        </View>

        {/* Alert Type Dropdown */}
        <View className="mb-6" style={{ zIndex: 1000 }}>
          <Text className={`text-sm font-medium ${darkMode ? 'text-light-100' : 'text-dark-200'} mb-2`}>
            Alert Type *
          </Text>
          <DropDownPicker
            open={alertTypeOpen}
            value={alertType}
            items={alertTypes}
            setOpen={setAlertTypeOpen}
            setValue={setAlertType}
            placeholder="Select alert type"
            style={{
              backgroundColor: darkMode ? '#34302B' : '#FFFFFF',
              borderColor: darkMode ? '#000000' : '#b1babf',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}
            textStyle={{
              fontSize: 16,
              color: darkMode ? '#FFFFFF' : '#000000',
            }}
            dropDownContainerStyle={{
              backgroundColor: darkMode ? '#34302B' : '#FFFFFF',
              borderColor: darkMode ? '#000000' : '#b1babf',
            }}
            listItemLabelStyle={{
              color: darkMode ? '#FFFFFF' : '#000000',
            }}
            selectedItemLabelStyle={{
              fontWeight: 'bold',
            }}
            placeholderStyle={{
              color: '#b1babf',
            }}
          />
        </View>

        {/* Anonymous Toggle */}
        <View className={`${darkMode ? 'bg-dark-200' : 'bg-accent'} rounded-xl p-4 mb-6 flex-row justify-between items-center`}>
          <View className="flex-1">
            <Text className={`text-base font-semibold ${darkMode ? 'text-accent' : 'text-dark-100'} mb-1`}>
              Post Anonymously
            </Text>
            <Text className={`text-sm ${darkMode ? 'text-light-100' : 'text-dark-200'}`}>
              Hide your identity from this alert
            </Text>
          </View>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: '#b1babf', true: '#005d9e' }}
            thumbColor={isAnonymous ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-tertiary rounded-xl py-4 items-center mb-8 mt-4"
          onPress={handleSubmitAlert}
          activeOpacity={0.8}
        >
          <Text className="text-accent text-lg font-bold">Submit Alert</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
