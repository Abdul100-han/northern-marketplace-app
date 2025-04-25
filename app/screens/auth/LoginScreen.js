import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#4CAF50', '#2E7D32']}
      className="flex-1 justify-center p-6"
    >
      <View className="items-center mb-10">
        <Image
          source={require('../../../assets/logo.jpg')}
          className="w-32 h-32 mb-4"
        />
        <Text className="text-3xl font-bold text-white">Northern Marketplace</Text>
        <Text className="text-lg text-white mt-2">Buy & Sell in Northern Nigeria</Text>
      </View>

      <View className="bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Login</Text>
        
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-6"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity
          className="bg-green-600 py-3 rounded-lg items-center"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="mt-4 items-center"
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text className="text-green-600">Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}