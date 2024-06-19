import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={[styles.CustomButton, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CustomButton: {
    width: 140, 
    height: 46,
    backgroundColor: '#FCAC75',
    // padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: "#535272"
  },
});

export default CustomButton;