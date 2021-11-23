import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import React from 'react';
import { firebaseConfig } from '../firebase/firebaseConfig';

initializeApp(firebaseConfig)
const auth = getAuth()

const Login: React.FC = () => {

    const login = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((res) => {
          console.log('logado')
        }).catch((error) => {
          console.log(error)
        })
    }

    return (
        <div>
            <button onClick={login}>Login with Google</button>
        </div>
    );
}

export default Login;