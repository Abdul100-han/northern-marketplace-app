import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import ProductItem from './ProductItem';

export default function ProductList({ navigation, title = 'Products', filterByCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let q;
        if (filterByCategory) {
          q = query(collection(db, 'products'), where('category', '==', filterByCategory));
        } else {
          q = query(collection(db, 'products'));
        }
        
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ 
            id: doc.id, 
            ...doc.data(),
            // Ensure image field is properly handled whether it's Base64 or URL
            image: doc.data().image || doc.data().imageUrl || null
          });
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterByCategory]);

  if (loading) {
    return (
      <View className="p-4">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
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