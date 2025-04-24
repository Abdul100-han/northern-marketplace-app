import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Farm Fresh Produce',
    description: 'Get the best farm products directly from local farmers',
    image: require('../../assets/slider.jpg'),
    color: ['#4CAF50', '#2E7D32'],
  },
  {
    id: 2,
    title: 'Handmade Crafts',
    description: 'Authentic Northern Nigerian crafts and textiles',
    image: require('../../assets/slider.jpg'),
    color: ['#FF9800', '#F57C00'],
  },
  {
    id: 3,
    title: 'Livestock Market',
    description: 'Buy and sell cattle, goats and poultry',
    image: require('../../assets/slider.jpg'),
    color: ['#2196F3', '#1976D2'],
  },
];

export default function Slider() {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      className="mb-6"
    >
      {slides.map((slide) => (
        <TouchableOpacity key={slide.id} activeOpacity={0.9}>
          <View style={{ width: width - 32 }} className="rounded-xl overflow-hidden">
            <Image
              source={slide.image}
              className="w-full h-48"
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              className="absolute bottom-0 left-0 right-0 h-1/2"
            />
            <View className="absolute bottom-0 left-0 right-0 p-4">
              <Text className="text-white text-xl font-bold">{slide.title}</Text>
              <Text className="text-white">{slide.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}