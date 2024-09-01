// In App.js in a new project

import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer, useBackButton } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme } from 'react-native';
import CustomDrawer from '../components/CustomDrawer';
import Features from '../components/Features';
import ChatHistory from '../components/ChatHistory';
import NumberCardsScreen from '../components/History';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawer {...props} />}>
   
      <Drawer.Screen name="Home" component={HomeScreen}  options={{}}/>
      <Drawer.Screen name="ChatHistory" component={ChatHistory} />
     
    </Drawer.Navigator>
  );
}

function StackNav(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Welcome"  component={WelcomeScreen} />
        <Stack.Screen name="Features" component={Features}/>
    </Stack.Navigator>
  );
}


function AppNavigation() {
  
  return (
    
    <NavigationContainer>
       <Drawer.Navigator screenOptions={{ headerShown: false }} >
       
        
        
       <Stack.Screen 
          name="StackNav"
          component={StackNav}
          options={{ headerShown: false }}
          initial
        />
        


        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
          initial
        />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;