// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   Button,
//   Platform,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from 'expo-image-picker';
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { database } from "../../firebaseconfig/firebaseConfig";

// export default function Listfirestore() {
//   const navigation = useNavigation();
//   const [projects, setProjects] = useState([]);

//   // const pickImage = async () => {
//   //   let result = await ImagePicker.launchImageLibraryAsync({
//   //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //     allowsEditing: true,
//   //     aspect: [4, 3],
//   //     quality: 1,
//   //   });

//   //   if (!result.canceled) {
//   //     setImageUri(result.assets[0].uri);
//   //   }
//   // };

//   // const uploadImage = async () => {
//   //   if (imageUri) {
//   //     const response = await fetch(imageUri);
//   //     const blob = await response.blob();
//   //     const storage = getStorage();
//   //     const storageRef = ref(storage, `images/${new Date().toISOString()}`);
//   //     setUploading(true);

//   //     const uploadTask = uploadBytesResumable(storageRef, blob);

//   //     uploadTask.on(
//   //       'state_changed',
//   //       (snapshot) => {
//   //         // Progress can be handled here if needed
//   //       },
//   //       (error) => {
//   //         console.error('Upload failed:', error);
//   //         setUploading(false);
//   //       },
//   //       () => {
//   //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//   //           console.log('Uploaded Image URL:', downloadURL);
//   //           setDownloadUrl(downloadURL);
//   //           setUploading(false);
//   //         });
//   //       }
//   //     );
//   //   }
//   // };

//   // useEffect(() => {
//   //   (async () => {
//   //     if (Platform.OS !== 'web') {
//   //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   //       if (status !== 'granted') {
//   //         alert('Desculpe, precisamos da permissão para acessar a galeria.');
//   //       }
//   //     }
//   //   })();
//   // }, []);

//   useEffect(() => {
//     const dbRef = collection(database, "projects");
//     const q = query(dbRef, orderBy("descricao", "asc"));

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       setProjects(
//         querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//       );
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileContainer}>
//         <Text> Home</Text>

// //Onde quero botar a minha imagem
        
//         <FlatList
//           style={{ height: "100%" }}
//           data={projects}
//           numColumns={1}
//           renderItem={({ item }) => (
//             <View style={styles.innerContainer}>
//               <Text style={styles.textHeader}>{item.nomeProjeto}</Text>
//               <Text style={styles.textHeader}>{item.descricao}</Text>
//               <Text style={styles.textHeader}>{item.linkGit}</Text>
//               <Text style={styles.about}>{item.tecnologiasUsadas}</Text>
//             </View>
//           )}
//           keyExtractor={(item) => item.id}
//         />
        
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#dfedfa",
//     padding: 10,
//     flex: 1,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   innerContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   textTitle: {
//     alignSelf: 'center',
//     marginTop: 20,
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   textHeader: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   about: {
//     fontWeight: "300",
//     fontSize: 14,
//   },
//   name: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     marginBottom: 20,
//     backgroundColor: '#ccc',
//   },
// });
