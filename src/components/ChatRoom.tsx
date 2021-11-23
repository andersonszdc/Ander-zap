import { getAuth, signOut } from '@firebase/auth';
import React, { useState } from 'react';
import { collection, Timestamp } from 'firebase/firestore';
import { addDoc, getFirestore, limit, orderBy, query } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage';

const auth = getAuth()
const db = getFirestore()

const ChatRoom: React.FC = () => {
    const messagesRef = collection(db, 'messages')
    const q = query(messagesRef, orderBy("createdAt"), limit(25))

    const [messages] = useCollectionData(q, {idField: 'id'})

    const [formValue, setFormValue] = useState('')

    const logout = () => {
        signOut(auth)
    }

    const sendMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser!
        setFormValue('')
        await addDoc((messagesRef), {
            createdAt: Timestamp.now(),
            text: formValue,
            photoURL,
            uid
        })
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <main>
                {messages && messages.map((msg: any) => <ChatMessage key={msg.id} msg={msg} />)}
            </main>
            <form onSubmit={sendMessage}>
                <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='Digite algo...' />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
}

export default ChatRoom;