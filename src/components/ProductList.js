import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import ProductItem from './ProductItem';

const products = [
  {
    id: 1,
    title: 'Fresh Tomatoes',
    price: '₦5,000',
    location: 'Kano',
    image: require('../../assets/products/tomatoes.jpg'),
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Handwoven Basket',
    price: '₦3,500',
    location: 'Kaduna',
    image: require('../../assets/products/basket.jpg'),
    rating: 4.2,
  },
  {
    id: 3,
    title: 'Local Rice (50kg)',
    price: '₦28,000',
    location: 'Kebbi',
    image: require('../../assets/products/rice.jpg'),
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Goat',
    price: '₦45,000',
    location: 'Sokoto',
    image: require('../../assets/products/goat.jpg'),
    rating: 4.3,
  },
];

export default function ProductList({ navigation, title = 'Products' }) {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        <TouchableOpacity>
          <Text className="text-green-600">See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onPress={() => navigation.navigate('ProductDetail', { product })}
          />
        ))}
      </ScrollView>
    </View>
  );
}