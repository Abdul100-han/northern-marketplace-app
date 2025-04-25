import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setLatestProducts(products);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header navigation={navigation} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Slider />
          <CategoryList navigation={navigation} />
          <ProductList 
            navigation={navigation} 
            title="Latest Products"
            products={latestProducts}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}