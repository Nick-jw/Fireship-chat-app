import '../styles/globals.css'
import NavBar from '../components/Navbar'
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context'

import { doc, onSnapshot } from 'firebase/firestore';

import { auth, firestore } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(auth)
  const [username, setUsername] = useState("jeff")
  console.log(`In _app.js username is ${username}`)

  useEffect(() => {
    let unsubscribe;

    if (user) {
      // const ref = firestore.collection('users').doc(user.uid);
      const ref = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    console.log(`In _app.js useEffect username is ${username}`)

    return unsubscribe;
  }, [user])






  return (
    <UserContext.Provider value = {{ user, username }}>
      <Toaster />
      <NavBar />
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
