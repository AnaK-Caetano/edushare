import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, Dimensions} from 'react-native';

import CustomButton from '../../components/Button/CustomButton';
import { useFonts } from 'expo-font';

import { collection, addDoc } from "firebase/firestore";
import { database, storage } from "../../firebaseconfig/firebaseConfig"; // assuming you have storage from firebaseConfig

const Projects = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
  });

  const [newItem, setNewItem] = useState({
    nomeProjeto: "",
    descricao: "",
    linkGit: "",
    tecnologiasUsadas: "",
    imagemUrl: "", // novo campo para armazenar a URL da imagem
  });
  const [imagem, setImagem] = useState(null); // estado para armazenar a imagem selecionada

  const onSubmit = async () => {
    try {
      let imageUrl = ""; // inicializa a URL da imagem como vazia

      // Se houver uma imagem selecionada, faça upload para o armazenamento
      if (imagem) {
        const imageRef = storage.ref().child(`images/${imagem.name}`);
        await imageRef.put(imagem);
        imageUrl = await imageRef.getDownloadURL();
      }

      // Atualiza o estado newItem com a URL da imagem, se houver
      const projeto = { ...newItem, imagemUrl: imageUrl };

      // Adiciona o documento ao Firestore
      const docRef = await addDoc(collection(database, "projects"), projeto);
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate('Home');
    } catch (error) {
      alert("Erro ao enviar o projeto");
      console.error(error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../../../assets/home_background_image.png')}
      style={styles.background}
    >

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.textTitle}>Cadastrar projeto</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.labelText}>Nome do Projeto</Text>
          <TextInput
            multiline={false}
            onChangeText={(text) => setNewItem({ ...newItem, nomeProjeto: text })}
            placeholder="Nome do Projeto"
            style={styles.textInput}
          />
          <Text style={styles.labelText}>Descrição</Text>
          <TextInput
            multiline={true}
            onChangeText={(text) => setNewItem({ ...newItem, descricao: text })}
            placeholder="Descrição"
            style={styles.textInput}
          />
          <Text style={styles.labelText}>Link para Github</Text>
          <TextInput
            multiline={false}
            onChangeText={(text) => setNewItem({ ...newItem, linkGit: text })}
            placeholder="Link para Github"
            style={styles.textInput}
          />
          <Text style={styles.labelText}>Tecnologias Utilizadas</Text>
          <TextInput
            multiline={false}
            onChangeText={(text) => setNewItem({ ...newItem, tecnologiasUsadas: text })}
            placeholder="Tecnologias Utilizadas"
            style={styles.textInput}
          />
          {/* <Text style={styles.labelText}>Imagem do Projeto</Text>
          <Button
            title="Selecionar Imagem"
            onPress={() => alert('Implemente a funcionalidade de seleção de imagem aqui')}
          /> */}
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Voltar"
            onPress={() => navigation.navigate('Home')}
            buttonStyle={styles.buttonVoltar}
            textStyle={styles.textVoltar}
          />
          <CustomButton
            title="Finalizar"
            onPress={onSubmit}
            buttonStyle={styles.buttonLogin}
          />
        </View>
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
    resizeMode: "cover", 
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  headerContainer: {
    marginTop: 55,
  },
  textTitle: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
    color: "#535272",
    marginTop: 35,
    marginBottom: 15,
    fontSize: 30,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 1,
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: "#535272",
    marginBottom: 4, // Espaçamento entre label e input
  },
  textInput: {
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
  buttonWrapper: {
    flexDirection: "row",
    padding: 10,
  },
  buttonLogin: {
    marginHorizontal: 10,
  },
  buttonVoltar: {
    marginHorizontal: 10,
    backgroundColor: "#535272",
  },
  textVoltar: {
    color: '#F2F0F0',
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
});

export default Projects;