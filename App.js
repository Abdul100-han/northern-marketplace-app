import React from 'react';
import { AuthProvider } from './app/context/AuthContext';
import RootStack from './app/navigation/RootStack';
import { LogBox } from 'react-native';
import "./global.css";

// Ignore specific warnings
LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core',
]);

export default function App() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}
