import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/CategoryList';

export default function ExploreScreen({ navigation }) {
  return (
    <ScrollView className="bg-gray-100 flex-1">
      <View className="p-4">
        <View className="flex-row items-center bg-white rounded-lg px-3 py-2 mb-4">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        <Text className="text-xl font-bold mb-4">Browse Categories</Text>
        <CategoryList navigation={navigation} />
        
        <Text className="text-xl font-bold mt-6 mb-4">Popular Products</Text>
        <ProductList navigation={navigation} />
      </View>
    </ScrollView>
  );
}