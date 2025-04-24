import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ProductItem from '../../components/ProductItem';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const q = query(
        collection(db, 'products'),
        where('keywords', 'array-contains', searchQuery.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center bg-white rounded-lg px-4 py-2 mb-4 shadow-sm">
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-2 h-10"
          placeholder="Search products..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          autoFocus
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text>Searching...</Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductItem 
              product={item} 
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : searchQuery ? (
        <View className="flex-1 items-center justify-center">
          <Text>No products found for "{searchQuery}"</Text>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="search" size={60} color="#E5E7EB" />
          <Text className="text-gray-400 mt-4">Search for products</Text>
        </View>
      )}
    </View>
  );
}