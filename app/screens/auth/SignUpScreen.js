import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await validationSchema.validate({ name, email, password, confirmPassword });
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
            <Text className="text-lg text-white mt-2">Join our community</Text>
          </View>

          <View className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <Text className="text-2xl font-bold text-gray-800 mb-6">Create Account</Text>
            
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4"
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
            />
            
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="next"
            />
            
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-6"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              returnKeyType="done"
            />
            
            <TouchableOpacity
              className="bg-green-600 py-3 rounded-lg items-center"
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text className="text-white font-bold text-lg">
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="mt-4 items-center"
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-green-600">Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}