import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function EnterPage(props) {
    const { user, username } = useContext(UserContext);
    console.log(user)
    console.log(username)

    return (
        <main>
            {user ?
            !username ? <UsernameForm /> : <SignOutButton />
            :
            <SignInButton />
            }
        </main>
    )
}

// Sign in with google
function SignInButton() {
    const signInWithGoogle = async () => {
        // await auth.signInWithGoogle(googleAuthProvider); 
        signInWithPopup(auth, googleAuthProvider);  
    }
    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}

function SignOutButton() {
    return <button onClick={() => signOut(auth)}>Sign Out</button>
}

function UsernameForm() {
    return <h1>Username form - user is defined with no username</h1>
}
