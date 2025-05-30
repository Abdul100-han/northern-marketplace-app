import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductItem({ product, onPress }) {
  return (
    <TouchableOpacity 
      className="w-48 bg-white rounded-lg shadow-sm mr-4 overflow-hidden"
      onPress={onPress}
    >
      {product.image ? (
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-32" 
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-32 bg-gray-200 items-center justify-center">
          <Ionicons name="image" size={40} color="#9CA3AF" />
        </View>
      )}
      
      <View className="p-3">
        <Text className="font-bold text-gray-800 mb-1" numberOfLines={1}>{product.title}</Text>
        <Text className="text-green-600 font-bold mb-1">₦{product.price}</Text>
        <Text className="text-gray-500 text-sm mb-2">{product.location}</Text>
        
        <View className="flex-row items-center">
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text className="text-gray-700 ml-1">{product.rating || 'New'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}