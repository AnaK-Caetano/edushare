import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Dimensions} from 'react-native';

import CustomButton from '../../components/Button/CustomButton';
import { useFonts } from 'expo-font';

import { auth } from '../../firebaseconfig/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../firebaseconfig/firebaseConfig";

const Register = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newItem, setNewItem] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    name: "",
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const onSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const updatedItem = { ...newItem, userId, email, password };
      setNewItem(updatedItem);
      
      await addDoc(collection(database, "user"), updatedItem);
      
      navigation.navigate('Login');
    } catch (error) {
      alert("Error");
      console.error(error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../../../assets/cadastro_background_image.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastre-se</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.labelText}>Nome de usuário (a)</Text>
          <TextInput
            placeholder="Ex. Samuel Cesar"
            multiline={false}
            onChangeText={(text) => setNewItem({ ...newItem, userName: text })}
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.labelText}>Nome Completo</Text>
          <TextInput
            multiline={false}
            onChangeText={(text) => setNewItem({ ...newItem, fullName: text })}
            placeholder="Ex. Samuel Cesar de Oliveira"
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.labelText}>E-mail institucional</Text>
          <TextInput
            placeholder="Ex. sco@etepd.com"
            style={styles.input}
            multiline={false}
            onChangeText={text=>setEmail(text)}
          ></TextInput>
        </View>


        <View style={styles.inputWrapper}>
          <Text style={styles.labelText}>Senha</Text>
          <TextInput
            multiline={false}
            onChangeText={text => setPassword(text)}    
            accessibilityLabel={`Campo de Senha`}
            secureTextEntry = {true}
            placeholder="**************"
            style={styles.input}
          ></TextInput>
        </View>

        <CustomButton
          title="Finalizar"
          onPress={onSubmit}
          buttonStyle={styles.buttonLogin}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonTextContainer}>
            Já tem uma conta?{' '}
            <Text style={styles.buttonTextLink}>Faça seu login</Text>
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
    // paddingHorizontal: 6,
  },
  title: {
    justifyContent: 'center',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: "#535272",
    marginTop: 85,
    marginBottom: 30,
  },
  inputWrapper: {
    width: '100%',
    // marginBottom: 3, // Espaçamento entre inputs
  },
  labelText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: "#535272",
    marginBottom: 4, // Espaçamento entre label e input
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Light', 
    backgroundColor: '#ECF3F1',
    placeholderTextColor: '#565656',
    borderWidth: 1,
    borderColor: '#CED4DA',
    marginBottom: 15,
  },
  buttonLogin: {
    width: 100,
    height: 46,
    fontSize: 8,
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

export default Register;