import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView className="bg-gray-100">
      <View className="items-center p-6 bg-white mb-4">
        <Image
          source={require('../../../assets/avatar.jpg')}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-xl font-bold">{user?.email || 'Guest'}</Text>
        <Text className="text-gray-500">Kano, Nigeria</Text>
      </View>

      <View className="bg-white p-4 mb-4">
        <TouchableOpacity className="flex-row items-center p-3">
          <Ionicons name="person" size={24} color="#4CAF50" />
          <Text className="ml-4">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-3">
          <Ionicons name="lock-closed" size={24} color="#4CAF50" />
          <Text className="ml-4">Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-3">
          <Ionicons name="notifications" size={24} color="#4CAF50" />
          <Text className="ml-4">Notifications</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-4 mb-4">
        <TouchableOpacity 
          className="flex-row items-center p-3"
          onPress={() => navigation.navigate('MyProducts')}
        >
          <Ionicons name="cube" size={24} color="#4CAF50" />
          <Text className="ml-4">My Products</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-3">
          <Ionicons name="heart" size={24} color="#4CAF50" />
          <Text className="ml-4">Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-3">
          <Ionicons name="chatbubble" size={24} color="#4CAF50" />
          <Text className="ml-4">Messages</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-4">
        <TouchableOpacity className="flex-row items-center p-3">
          <Ionicons name="settings" size={24} color="#4CAF50" />
          <Text className="ml-4">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center p-3"
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={24} color="#FF5252" />
          <Text className="ml-4 text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}