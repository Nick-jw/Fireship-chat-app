import { auth, googleAuthProvider, firestore } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../lib/context';

import debounce from 'lodash.debounce'

export default function EnterPage(props) {
    const { user, username } = useContext(UserContext);
    console.log(`In enter.js username is ${username}`)

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
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue])

    const onChange = e => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length < 3) {
            setFormValue(val);
            setIsLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setIsLoading(true);
            setIsValid(false);
        }
    }

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = doc(firestore, `username/${username}`)
                const snap = await getDoc(ref)
                console.log("Firestore read executed!")
                const docExists = snap.exists();
                setIsValid(!docExists);
                setIsLoading(false);
            }
        }, 500),
    []
    );

    const onSubmit = e => {

    }



    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder='username' value={formValue} onChange={onChange} />

                    <button type="submit" className="btn-green" disabled={!isValid}></button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {isLoading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    )
}
