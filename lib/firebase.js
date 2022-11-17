import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyATn-c3EyLoAoQH3QSPxm0xArdv5GKqctA",
    authDomain: "fireship-ee2d7.firebaseapp.com",
    projectId: "fireship-ee2d7",
    storageBucket: "fireship-ee2d7.appspot.com",
    messagingSenderId: "674940006303",
    appId: "1:674940006303:web:2126b9377b65011e7217aa",
    measurementId: "G-R92SS4DPHF"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);
export const storage = getStorage(app);