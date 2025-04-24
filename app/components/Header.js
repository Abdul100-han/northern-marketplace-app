import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation }) {
  return (
    <View className="flex-row items-center justify-between p-4 bg-white shadow-sm">
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
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