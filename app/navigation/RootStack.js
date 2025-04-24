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
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      {/* Auth Stack */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />

      {/* Main App Stack */}
      <Stack.Screen name="Main" component={MainTab} />
      
      {/* Product Screens */}
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Product Details',
          headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen 
        name="ProductsByCategory" 
        component={ProductsByCategoryScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params.category} Products`,
          headerBackTitle: 'Back'
        })}
      />
    </Stack.Navigator>
  );
}