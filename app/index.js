import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import RootStack from './navigation/RootStack';
import "../global.css"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <AuthProvider>
            <RootStack />
          </AuthProvider>
        </NavigationContainer>
      </NavigationIndependentTree>
    </GestureHandlerRootView>
  );
}