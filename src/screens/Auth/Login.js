import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

import CustomButton from '../../components/Button/CustomButton';
import { useFonts } from 'expo-font';

import { auth } from '../../firebaseconfig/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    await signInWithEmailAndPassword(auth, email, password).then(value => {
      console.log('logado' + value.user.uid);
      navigation.navigate('Home');
    })
      .catch(error => console.log(error));
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
     <ImageBackground
      source={require('../../../assets/login_background_image.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <Text style={styles.title}>Edushare</Text>
      <Text style={styles.subTitle}>Seja Bem-Vindo (a)</Text>
      <TextInput
        placeholder="Digite o E-mail institucional"
        style={styles.input}
        value={email}
        accessibilityLabel={`Campo de E-mail`}
        onChangeText={value => setEmail(value)}
        />
      <TextInput
        placeholder="Sua senha"
        style={styles.input}
        value={password}
        accessibilityLabel={`Campo de Senha`}
        secureTextEntry = {true}
        onChangeText={value => setPassword(value)}
      />
      
      <CustomButton
        title="Entrar"
        onPress={() => loginUser()}
        buttonStyle={styles.buttonLogin}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonTextContainer}>
          Não tem cadastro?{' '}
          <Text style={styles.buttonTextLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
    
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Poppins-Black',
    color: "#535272",
    marginTop: 85, 
    marginBottom: 42, 
  }, 
  subTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: "#535272",
    marginBottom: 20, 
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Light', 
    backgroundColor: '#ECF3F1',
    placeholderTextColor: '#56565680',
    borderWidth: 1,
    borderColor: '#CED4DA',
    marginBottom: 20,
  },
  buttonLogin: {
    width: 100, 
    height: 46,
    fontSize: 20,
    marginTop: 20, 
    marginBottom: 20,
  },
  buttonRegister: {
    marginTop: 10, 
  },
  buttonTextContainer: {
    marginTop: 10,
    fontFamily: 'Poppins-Light',
  },
  buttonTextLink: {
    fontWeight: 'bold',
    color: '#535272',
  },
});

export default Login;
