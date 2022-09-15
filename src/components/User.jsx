import React, {useEffect, useState} from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'

const User = ({user, selectUser, loggedInUser, chat}) => {
  const   user2 = user?.uid
  
  const [data, setData] = useState('')
  useEffect(() => {
    const id = loggedInUser > user2 ? `${loggedInUser + user2}` : `${user2 + loggedInUser}`
    let unsub = onSnapshot(doc(db, 'lastMsg', id), doc => {
      setData(doc.data())
    })
    return () => unsub()
  }, [])

  console.log(data)
  return (
    <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} onClick={() => selectUser(user)}>
        <div className='user_info'>
            <div className='user_detail'>
                <img src={user.avatar} alt="avatar" className="avatar"/>
                <h4>{user.name}</h4>
                {data?.from !== loggedInUser && data?.unread && (
                  <small className='unread'>New</small>
                  )}
            </div>
            <div className={`user_status ${user.isOnline ? 'online' : 'offline'}`}></div>
        </div>
        {data && (
          <p className='last_msg'>
          <strong>{data.from === loggedInUser ? "Me:" : null}</strong>
          {!data.media ? data.text : "Photo"}
          </p>
        )}
    </div>
  )
}

export default User