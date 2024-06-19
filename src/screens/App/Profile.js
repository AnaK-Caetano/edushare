import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Button, Platform, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database } from "../../firebaseconfig/firebaseConfig";
import { useFonts } from 'expo-font'; // Importação do hook useFonts

export default function Listfirestore() {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Carregamento de Fontes
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = ref(storage, `images/${new Date().toISOString()}`);
      setUploading(true);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress can be handled here if needed
        },
        (error) => {
          console.error('Upload failed:', error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Uploaded Image URL:', downloadURL);
            setDownloadUrl(downloadURL);
            setUploading(false);
          });
        }
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos da permissão para acessar a galeria.');
        }
      }
    })();
  }, []);

  useEffect(() => {
    const dbRef = collection(database, "user");
    const q = query(dbRef, orderBy("fullName", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUser(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsubscribe;
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
        <View style={styles.profileContainer}>
          <Image source={downloadUrl ? { uri: downloadUrl } : null} style={styles.image} />
          <FlatList
            style={{ height: "100%" }}
            data={user}
            numColumns={1}
            renderItem={({ item }) => (
              <View style={styles.innerContainer}>
                <Text style={styles.textHeader}>{item.fullName}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.buttonRow}>
              <Button 
              title="Escolher Imagem" 
              onPress={pickImage}
              buttonStyle={styles.buttonEscolherImagem}
              textStyle={styles.textEscolherImagem} />

              <Button 
              title="Fazer Upload" 
              onPress={uploadImage} 
              disabled={uploading} 
              buttonStyle={styles.buttonUpload}/>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonLogout}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    padding: 10,
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },
  textTitle: {
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  about: {
    fontWeight: "300",
    fontSize: 14,
  },
  name: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
  buttonRow:{
    flexDirection: "row",
    padding: 10,
  }, 
  buttonEscolherImagem: {
    marginHorizontal: 10,
    backgroundColor: "#535272",
  },
  textEscolherImagem: {
    color: '#F2F0F0',
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
  buttonUpload: {
    marginHorizontal: 10,
  },
  buttonLogout: {
    fontWeight: 'bold',
    color: '#535272',
    marginTop: 10,
    fontFamily: 'Poppins-Light',
  },
});
