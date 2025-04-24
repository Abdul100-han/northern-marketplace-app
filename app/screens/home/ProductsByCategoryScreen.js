import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ProductList from '../../components/ProductList';

export default function ProductsByCategoryScreen({ route }) {
  const { category } = route.params;
  
  return (
    <ScrollView className="bg-gray-100 flex-1">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Products in {category}</Text>
        <ProductList 
          title={`${category} Products`}
          filterByCategory={category}
        />
      </View>
    </ScrollView>
  );
}