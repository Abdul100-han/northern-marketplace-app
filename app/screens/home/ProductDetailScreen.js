import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${product.title} for ${product.price} in ${product.location}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView className="bg-white">
      <View className="relative">
        <Image 
          source={product.image} 
          className="w-full h-80" 
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          className="absolute bottom-0 left-0 right-0 h-32"
        />
        <View className="absolute bottom-0 left-0 right-0 p-4">
          <Text className="text-white text-2xl font-bold">{product.title}</Text>
          <Text className="text-white text-lg">{product.price}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Ionicons name="location" size={20} color="#4CAF50" />
            <Text className="text-gray-700 ml-2">{product.location}</Text>
          </View>
          
          <TouchableOpacity 
            className="bg-green-100 p-2 rounded-full"
            onPress={handleShare}
          >
            <Ionicons name="share-social" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mb-4">
          <Ionicons name="star" size={20} color="#FFC107" />
          <Text className="text-gray-700 ml-1">{product.rating}</Text>
          <Text className="text-gray-500 ml-2">(24 reviews)</Text>
        </View>

        <Text className="text-lg font-bold mb-2">Description</Text>
        <Text className="text-gray-700 mb-6">{product.description || 'No description provided'}</Text>

        <View className="border-t border-gray-200 pt-4 mb-4">
          <Text className="text-lg font-bold mb-2">Seller Information</Text>
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/avatar.png')}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="font-bold">Abubakar Sadiq</Text>
              <Text className="text-gray-500">Member since 2022</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="bg-green-600 p-4 rounded-lg items-center mt-4">
          <Text className="text-white font-bold">Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}