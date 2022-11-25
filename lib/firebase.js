import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore, query, where, limit, getDocs, doc, Timestamp } from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const fromMillis = Timestamp.fromMillis;

/**
 * Gets a users/{uid} document from a username
 * @param {string} username 
 */
 export async function getUserWithUsername(username) {
    const userRef = collection(firestore, 'users');
    const userQuery = query(userRef, where('username', '==', username), limit(1));
    const userDoc = (await getDocs(userQuery)).docs[0];
    const userDocRef = doc(firestore, 'users', username);
    return { userDoc };
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc 
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    }
}