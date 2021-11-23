import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseConfig } from './firebase/firebaseConfig'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'


initializeApp(firebaseConfig)
const auth = getAuth()

function App() {

  const [user, loading, error] = useAuthState(auth)

  if (loading) return <div>loading...</div>
  if (error) return <div>{error}</div>
  return user ? <ChatRoom /> : <Login />
}

export default App;
