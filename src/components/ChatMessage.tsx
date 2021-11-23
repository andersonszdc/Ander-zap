import { getAuth } from '@firebase/auth';
import React from 'react';

const auth = getAuth()

type msgProps = {
    uid: string,
    photoURL: string,
    text: string,
    id: string,
    createdAt: any
}

interface messageProps {
    msg: msgProps
}

const ChatMessage: React.FC<messageProps> = ({msg}) => {

    const {uid, text, photoURL} = msg

    const messageClass = uid === auth.currentUser?.uid ? 'enviada' : 'recebida'

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt='user-img' />
            <p>{text}</p>
        </div>
    );
}

export default ChatMessage;