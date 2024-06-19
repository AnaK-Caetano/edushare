import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { database } from "../../firebaseconfig/firebaseConfig";

export default function Listfirestore() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Projetos</Text>
      <FlatList
        data={projects}
        renderItem={({ item }) => (
          <View style={styles.projectContainer}>
            <Text style={styles.textHeader}>{item.nomeProjeto}</Text>
            <Text style={styles.textHeader}>{item.descricao}</Text>
            <Text style={styles.textHeader}>{item.linkGit}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfedfa",
    padding: 10,
    flex: 1,
  },
  textTitle: {
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  projectContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
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
