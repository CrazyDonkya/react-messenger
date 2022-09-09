import React, {useRef, useEffect} from 'react'
import Moment from 'react-moment'

const Message = ({msg, loggedInUser}) => {
    const scrollRef = useRef()
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [msg])
  return (
    <div className={`message_wrapper ${msg.from === loggedInUser ? 'own' : ''}`} ref={scrollRef}>
        <p className={msg.from === loggedInUser ? 'me' : 'you'}>
            {msg.media ? <img src={msg.media} alt={msg.text}/>:null}
            {msg.text}
            <br/>
            <small>
                <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </small>
        </p>
    </div>
  )
}

export default Message