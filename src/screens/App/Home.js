import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity, Linking } from "react-native";

import { useFonts } from 'expo-font';

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { database } from "../../firebaseconfig/firebaseConfig";

export default function Listfirestore() {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const dbRef = collection(database, "projects");
      const q = query(dbRef, orderBy("descricao", "asc"));

      onSnapshot(q, async (querySnapshot) => {
        const projectsData = [];
        for (const doc of querySnapshot.docs) {
          const project = doc.data();
          project.id = doc.id;
          // Verifica se há imagePath definido no projeto
          if (project.imagePath) {
            try {
              // Obtém a referência da imagem no Firebase Storage
              const storage = getStorage();
              const imageRef = ref(storage, project.imagePath);
              // Obtém a URL de download da imagem
              const imageUrl = await getDownloadURL(imageRef);
              // Adiciona a URL da imagem ao objeto do projeto
              project.imageUrl = imageUrl;
            } catch (error) {
              console.error('Erro ao obter URL da imagem:', error);
            }
          }
          projectsData.push(project);
        }
        setProjects(projectsData);
      });
    };

    loadProjects();
  }, []);

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
          <Text style={styles.textTitle}>Edushare</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.textSubTitle}>Projetos Compartilhados</Text>
          <FlatList
            data={projects}
            renderItem={({ item }) => (
              <View style={styles.projectContainer}>
                <Text style={styles.textHeader}>{item.nomeProjeto}</Text>
                <Text style={styles.textDesc}>{item.descricao}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.linkGit)}>
                    <Text style={styles.textLink}>{item.linkGit}</Text>
                </TouchableOpacity>
                <Text style={styles.textCardSection}>Tecnologias utilizadas</Text>
                <Text style={styles.about}>{item.tecnologiasUsadas}</Text>
                {/* Renderiza a imagem se a URL estiver definida */}
                {item.imageUrl && (
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                )}
              </View>
            )}
            keyExtractor={(item) => item.id}
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
    alignItems: 'center',
    resizeMode: "cover", 
  },
  container: {
    paddingVertical: 24,
    flex: 1,
  },
  headerContainer: {
    marginTop: 55,
  },
  textTitle: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Black',
    color: "#535272",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 35,
  },
  textSubTitle: {
    alignSelf: 'left',
    fontFamily: 'Poppins-SemiBold',
    color: "#535272",
    marginTop: 20,
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24, // Adiciona a margem lateral de 24px
  },
  projectContainer: {
    width: '100%',
    backgroundColor: '#F3F3F3',
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
    elevation: 3,
  },
  textHeader: {
    fontFamily: 'Poppins-SemiBold', 
    color: "#535272",
    fontSize: 22,
    marginBottom: 5,
  },
  textDesc: {
    fontFamily: 'Poppins-Light', // Utilizei a fonte correta para consistência
    fontSize: 14,
    marginBottom: 5,
  },
  textCardSection: {
    fontFamily: 'Poppins-SemiBold', 
    color: "#535272",
    fontSize: 16,
  },
  textLink: {
    fontFamily: 'Poppins-Light', // Utilizei a fonte correta para consistência
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
    marginBottom: 5,
  },
  about: {
    fontFamily: 'Poppins-Light', // Utilizei a fonte correta para consistência
    fontSize: 14,
  },
  about: {
    fontWeight: "300",
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});