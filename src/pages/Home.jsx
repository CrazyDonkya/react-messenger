import React, {useEffect, useState} from 'react'
import {db, auth, storage} from '../firebase'
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc } from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import User from '../components/User'
import MessageForm from '../components/MessageForm'
import Message from '../components/Message'

const Home = () => {
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState('')
  const [text, setText] = useState('')
  const [img, setImg] = useState('')
  const [msgs, setMsgs] = useState([])

  const loggedInUser = auth.currentUser.uid

  useEffect(()=>{
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('uid', 'not-in', [loggedInUser]))
    const unsub = onSnapshot(q, querySnapshot => {
      let users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      setUsers(users)
    })
    return () => unsub() 
  }, [])
  const selectUser = (user) => {
    setChat(user)
    const user2 = user.uid
    const id = loggedInUser > user2 ? `${loggedInUser + user2}` : `${user2 + loggedInUser}`
    const messagesRef = collection(db, 'messages', id, 'chat')
    const q = query(messagesRef, orderBy('createdAt', 'asc'))
    onSnapshot(q, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const user2 = chat.uid
    const id = loggedInUser > user2 ? `${loggedInUser + user2}` : `${user2 + loggedInUser}`

    let url
    if (img) {
      const imgRef = ref(
        storage, 
        `images/${new Date().getTime()} - ${img.name}`
        )
      const snap = await uploadBytes(imgRef, img)
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlurl
    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: loggedInUser,
      to: user2,
      createdAt:Timestamp.fromDate(new Date()),
      media: url || '',
    })
    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: loggedInUser,
      to: user2,
      createdAt:Timestamp.fromDate(new Date()),
      media: url || '',
      unread:true,
    })
    setText('')
  }
  return (
    <div className='home_container'>
      <div className='users_container'>
        {users.map(user => <User key={user.uid} user={user} selectUser={selectUser} loggedInUser={loggedInUser}/>)}
      </div>
      <div className='messages_container'>
        {chat ? (
            <div>
              <div className='messages_user'>
                <h3>{chat.name}</h3>
              </div>
              <div className='messages'>
                {msgs.length ? 
                msgs.map((msg, i) => <Message key={i} msg={msg} loggedInUser={loggedInUser}/>) 
                : null}
              </div>
              <MessageForm 
              handleSubmit={handleSubmit} 
              text={text} 
              setText={setText}
              setImg={setImg}
              />
            </div>
          ) : (
            <h3 className='no_chat'>Select a user</h3>
          )}
      </div>
    </div>
  )
}

export default Home;