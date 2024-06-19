import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { useFonts } from 'expo-font';
import CustomButton from '../../components/Button/CustomButton';
import Input from '../../components/Input/Input';
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../firebaseconfig/firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig/firebaseConfig';



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
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>

      <TextInput
        multiline={false}
        onChangeText={text=>setEmail(text)}
        placeholder="Name"
        style={styles.textInput}
      ></TextInput>
      <TextInput
        multiline={false}
        onChangeText={text => setPassword(text)}
        placeholder="Name"
        style={styles.textInput}
      ></TextInput>
       <TextInput
        multiline={false}
        onChangeText={(text) => setNewItem({ ...newItem, userName: text })}
        placeholder="Name"
        style={styles.textInput}
      ></TextInput>
      <TextInput
        multiline={false}
        onChangeText={(text) => setNewItem({ ...newItem, fullName: text })}
        placeholder="Name"
        style={styles.textInput}
      ></TextInput>
    
      <Text style={[styles.text, { textAlign: 'left' }]}>Nome de usuário (a)</Text>
      <Input
        multiline={false}
        onChangeText={(text) => setNewItem({ ...newItem, userName: text })}

        style={styles.textInput}
        placeholder="Ex. Samuel Cesar"
      ></Input>

      <Text style={[styles.text, { textAlign: 'left' }]}>Nome Completo</Text>
      <Input
        multiline={false}
        onChangeText={(text) => setNewItem({ ...newItem, fullName: text })}
        style={styles.textInput}
        placeholder="Ex. Samuel Cesar de Oliveira"
      ></Input>

      <Text style={[styles.text, { textAlign: 'left' }]}>E-mail institucional</Text>
      <Input
        multiline={false}
        onChangeText={(text) => setNewItem({ ...newItem, email: text })}
        style={styles.textInput}
        placeholder="Ex. sco@etepd.com"
      ></Input>

      <Text style={[styles.text, { textAlign: 'left' }]}>Senha</Text>
      <Input
        multiline={false}
        onChangeText={(text) => setNewItem({ ...newItem, password: text })}
        style={styles.textInput}
        placeholder="**************"
      ></Input>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: "#535272",
    marginBottom: 50,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: "#535272",
  },

  buttonLogin: {
    width: 100,
    height: 46,
    fontSize: 15,
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
