import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header navigation={navigation} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Slider />
          <CategoryList navigation={navigation} />
          <ProductList navigation={navigation} title="Latest Products" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}