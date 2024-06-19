import React from 'react';
import { View, StyleSheet, Image, Dimensions} from 'react-native';

import Splash from "../../../assets/splash.png";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={Splash} style={styles.image}></Image>
      </View>
    </View>
  );
}

export default SplashScreen;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: width,
        height: height,
        resizeMode: "cover", 

    }
})
