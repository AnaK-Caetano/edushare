import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
import 'firebase/storage';
import firebase from 'firebase/app';


const firebaseConfig = {
	apiKey: "AIzaSyDkQutbPaMKkavTiBIy0iFrnCLT1RPXSVY",
	authDomain: "fire-app-edu.firebaseapp.com",
	projectId: "fire-app-edu",
	storageBucket: "fire-app-edu.appspot.com",
	messagingSenderId: "358434926698",
	appId: "1:358434926698:web:d965cbbfad7d6353ffda13",
	measurementId: "G-3NXPL948HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// export const database = getFirestore(app);

export const database = initializeFirestore(app, {
	experimentalAutoDetectLongPolling: true,
});
export const auth = getAuth(app);

export { firebase };