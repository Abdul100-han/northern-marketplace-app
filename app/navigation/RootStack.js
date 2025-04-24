import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import MainTab from './MainTab';
import ProductDetailScreen from '../screens/home/ProductDetailScreen';
import ProductsByCategoryScreen from '../screens/home/ProductsByCategoryScreen';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Login" // Start with Login screen
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Main" component={MainTab} />
      
      {/* Add these screens for proper navigation */}
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ headerShown: true, title: 'Product Details' }}
      />
      <Stack.Screen 
        name="ProductsByCategory" 
        component={ProductsByCategoryScreen}
        options={({ route }) => ({ 
          headerShown: true, 
          title: `${route.params.category} Products` 
        })}
      />
    </Stack.Navigator>
  );
}