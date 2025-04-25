import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.string().required('Price is required'),
  category: yup.string().required('Category is required'),
  location: yup.string().required('Location is required'),
});

const convertImageToBase64 = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export default function AddPostScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async (values) => {
    if (!image) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    try {
      setUploading(true);
      const imageBase64 = await convertImageToBase64(image);
      
      await addDoc(collection(db, 'products'), {
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        location: values.location,
        image: imageBase64,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        keywords: generateKeywords(values.title)
      });

      Alert.alert('Success', 'Product added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  const generateKeywords = (title) => {
    const keywords = [];
    const titleWords = title.toLowerCase().split(' ');
    
    for (let i = 0; i < titleWords.length; i++) {
      for (let j = i + 1; j <= titleWords.length; j++) {
        keywords.push(titleWords.slice(i, j).join(' '));
      }
    }
    
    return keywords;
  };

  return (
    <ScrollView className="p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-6">Add New Product</Text>
      
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: '',
          category: '',
          location: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TouchableOpacity 
              className="items-center justify-center bg-white rounded-lg p-4 mb-4 h-48 border border-dashed border-gray-300"
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} className="w-full h-full rounded-lg" />
              ) : (
                <View className="items-center">
                  <Ionicons name="camera" size={40} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">Add Product Image</Text>
                </View>
              )}
            </TouchableOpacity>

             {/* Form Fields */}
           <View className="mb-4">
              <Text className="text-gray-700 mb-1">Title</Text>
             <TextInput
                className="bg-white p-3 rounded-lg"
                placeholder="Product title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
             {touched.title && errors.title && (
                <Text className="text-red-500 text-sm mt-1">{errors.title}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Description</Text>
              <TextInput
                className="bg-white p-3 rounded-lg h-24"
                placeholder="Product description"
                multiline
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              {touched.description && errors.description && (
                <Text className="text-red-500 text-sm mt-1">{errors.description}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Price (₦)</Text>
              <TextInput
                className="bg-white p-3 rounded-lg"
                placeholder="Product price"
                keyboardType="numeric"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
              />
              {touched.price && errors.price && (
                <Text className="text-red-500 text-sm mt-1">{errors.price}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Category</Text>
              <TextInput
                className="bg-white p-3 rounded-lg"
                placeholder="Product category"
                onChangeText={handleChange('category')}
                onBlur={handleBlur('category')}
                value={values.category}
              />
              {touched.category && errors.category && (
                <Text className="text-red-500 text-sm mt-1">{errors.category}</Text>
              )}
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 mb-1">Location</Text>
              <TextInput
                className="bg-white p-3 rounded-lg"
                placeholder="Your location"
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
                value={values.location}
              />
              {touched.location && errors.location && (
                <Text className="text-red-500 text-sm mt-1">{errors.location}</Text>
              )}
            </View>
            
            <TouchableOpacity
              className="bg-green-600 p-4 rounded-lg items-center"
              onPress={handleSubmit}
              disabled={uploading}
            >
              <Text className="text-white font-bold">
                {uploading ? 'Uploading...' : 'Add Product'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}