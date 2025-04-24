import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

const categories = [
  { id: 1, name: 'Agriculture', icon: require('../../assets/categories/agriculture.png') },
  { id: 2, name: 'Livestock', icon: require('../../assets/categories/livestock.png') },
  { id: 3, name: 'Textiles', icon: require('../../assets/categories/textiles.png') },
  { id: 4, name: 'Crafts', icon: require('../../assets/categories/crafts.png') },
  { id: 5, name: 'Food', icon: require('../../assets/categories/food.png') },
  { id: 6, name: 'Services', icon: require('../../assets/categories/services.png') },
];

export default function CategoryList({ navigation }) {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">Categories</Text>
        <TouchableOpacity>
          <Text className="text-green-600">See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            className="items-center mr-4"
            onPress={() => navigation.navigate('ProductsByCategory', { category: category.name })}
          >
            <View className="bg-white p-3 rounded-full shadow-sm mb-2">
              <Image source={category.icon} className="w-10 h-10" />
            </View>
            <Text className="text-gray-700">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}