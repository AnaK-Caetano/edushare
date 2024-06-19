import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import CustomButton from '../../components/Button/CustomButton';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig/firebaseConfig';
import Input from '../../components/Input/Input';

const Login = ({ navigation }) => {

  const [credentials, setCredentials] = useState({
    login: '',
    senha: '',
  });

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
    <View style={styles.container}>
      <Text style={styles.title}>Edushare</Text>
      <Text style={styles.text}>Seja Bem-Vindo (a)</Text>
      <TextInput
        placeholder="Digite um email..."
        style={styles.input}
        value={email}
        onChangeText={value => setEmail(value)}
      />


      <TextInput
        placeholder="Sua senha"
        style={styles.input}
        value={password}
        onChangeText={value => setPassword(value)}
      />
      <View style={styles.inputWrapper}>
        {Object.keys(credentials).map((key) => (
          <Input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize a primeira letra da chave
            secureTextEntry={key === 'senha'} // Verifica se a chave é 'senha' para definir secureTextEntry
            value={credentials[key]}
            onChangeText={(text) => setCredentials((prevState) => ({ ...prevState, [key]: text }))}
          />
        ))}
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Poppins-Black',
    color: "#535272",
    marginBottom: 72, 
  }, 
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: "#535272",
    marginBottom: 20, 
  }, 
  buttonLogin: {
    width: 100, 
    height: 46,
    fontSize: 20,
    marginTop: 20, 
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