import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/App/Home';
import Profile from '../screens/App/Profile';
import Projects from '../screens/App/Projects';
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
       <Tab.Screen 
      name="Projects" 
      component={Projects}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="package"  color="#535272" size={24}  /> 
        ),
        tabBarLabel: 'Projetos', // Adiciona o label ao botão
        headerShown: false
      }}
       />

      <Tab.Screen 
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="home"  color="#535272" size={30}  /> 
        ),
        tabBarLabel: 'Home',
        headerShown: false
      }}
       />

      <Tab.Screen 
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="user"  color="#535272" size={24}  /> 
        ),
        tabBarLabel: 'Meu Perfil', // Adiciona o label ao botão
        headerShown: false
      }}
       />
    </Tab.Navigator>
  );
}

export default TabNavigator;