import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootStack from './src/navigation/RootStack';
import { NativeWindStyleSheet } from 'nativewind';
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core',
]);

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}