import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';
import { collection, addDoc } from "firebase/firestore";
import { database, storage } from "../../firebaseconfig/firebaseConfig"; // assuming you have storage from firebaseConfig

const Projects = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar projeto</Text>
      <View style={styles.box}>
        <Text style={styles.text}>Nome do Projeto</Text>
        <TextInput
          multiline={false}
          onChangeText={(text) => setNewItem({ ...newItem, nomeProjeto: text })}
          placeholder="Nome do Projeto"
          style={styles.textInput}
        />
        <Text style={styles.text}>Descrição</Text>
        <TextInput
          multiline={true}
          onChangeText={(text) => setNewItem({ ...newItem, descricao: text })}
          placeholder="Descrição"
          style={styles.textInput}
        />
        <Text style={styles.text}>Link para Github</Text>
        <TextInput
          multiline={false}
          onChangeText={(text) => setNewItem({ ...newItem, linkGit: text })}
          placeholder="Link para Github"
          style={styles.textInput}
        />
        <Text style={styles.text}>Técnologias Utilizadas</Text>
        <TextInput
          multiline={false}
          onChangeText={(text) => setNewItem({ ...newItem, tecnologiasUsadas: text })}
          placeholder="Técnologias Utilizadas"
          style={styles.textInput}
        />
        <Text style={styles.text}>Imagem do Projeto</Text>
        <Button
          title="Selecionar Imagem"
          onPress={() => alert('Implemente a funcionalidade de seleção de imagem aqui')}
        />
      </View>
      <View style={styles.btn}>
        <CustomButton
          title="Voltar"
          onPress={() => navigation.navigate('Home')}
          buttonStyle={styles.buttonLogin}
        />
        <CustomButton
          title="Finalizar"
          onPress={onSubmit}
          buttonStyle={styles.buttonLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: "#535272",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: "#535272",
    marginBottom: 5,
  },
  box: {
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  btn: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonLogin: {
    marginHorizontal: 10,
  },
});

export default Projects;
