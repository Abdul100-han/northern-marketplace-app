// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation }) {
  // Alternative drawer toggle solution
  const toggleDrawer = () => {
    if (navigation.toggleDrawer) {
      navigation.toggleDrawer();
    } else {
      // Fallback to navigate to profile if drawer isn't available
      navigation.navigate('Profile');
    }
  };

  return (
    <View className="flex-row items-center justify-between p-4 bg-white shadow-sm">
      <TouchableOpacity onPress={toggleDrawer}>
        <Ionicons name="menu" size={28} color="#4CAF50" />
      </TouchableOpacity>
      
      <View className="items-center">
        <Image
          source={require('../../assets/logo-small.png')}
          className="w-10 h-10"
        />
        <Text className="text-green-600 font-bold">Northern Market</Text>
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search" size={28} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
}