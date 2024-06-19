import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/App/Home';
import Profile from '../screens/App/Profile';
import Projects from '../screens/App/Projects';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Projects" component={Projects} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default TabNavigator;