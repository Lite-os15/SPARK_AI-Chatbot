
import React from 'react';



import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AppNavigation from './src/navigation';
import { LogBox } from 'react-native';
import AppNavigation2 from './src/navigation/index2';



export default function App() {
  LogBox.ignoreAllLogs(true);
  return (

    <AppNavigation />
  );
}

