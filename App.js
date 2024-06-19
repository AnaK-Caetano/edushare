import 'react-native-gesture-handler';
import React from 'react';
import NavigationManager from './src/navigation/NavigationManager';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationManager />
    </>
  );
}