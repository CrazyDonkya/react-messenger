import './App.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import "firebase/compat/auth";

import { useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyBLkxgYTOkk7ftVz3KcsPHl1-Yn-CVSPCQ",
  authDomain: "mymessenger-e94c5.firebaseapp.com",
  projectId: "mymessenger-e94c5",
  storageBucket: "mymessenger-e94c5.appspot.com",
  messagingSenderId: "768097699297",
  appId: "1:768097699297:web:532c194bef62cb06b9fea0",
  measurementId: "G-L11R5CTTKP"
})

const auth = firebase.auth();
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className='App-header'>
        <SignOut/>
      </header>
      <section className='App-main'>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  )
}

function ChatRoom() {
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField:'id'})
  const [formValue,setFormValue] = useState('');
  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid,photoURL} = auth.currentUser;
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })
    setFormValue('');
  }

  return (
    <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </main>
        <form onSubmit={sendMessage}> 
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
          <button type="submit" disabled={!formValue}>SEND</button>
        </form>
    </>)
}

function ChatMessage(props) {
  const {text, uid, photoURL} = props.message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  console.log(auth.currentUser)

  return(
    <>
      <div className={`message ${messageClass}`}>
        <img src = {photoURL}/>
        <p>{text}</p>
      </div>
    </>
    )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App
