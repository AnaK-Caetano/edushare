import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './StackNavigator'; 
import TabNavigator from './TabNavigator'; 
import SplashScreen from '../screens/Auth/SplashScreen';

const Stack = createStackNavigator();

const NavigationManager = () => {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 2000); 
  }, []);

  return (
    <NavigationContainer>
      {isShowSplashScreen ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={StackNavigator} />
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default NavigationManager;