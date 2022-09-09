import React, {useEffect, useState} from 'react'

const User = ({user, selectUser, loggedInUser}) => {
  return (
    <div className='user_wrapper' onClick={() => selectUser(user)}>
        <div className='user_info'>
            <div className='user_detail'>
                <img src={user.avatar} alt="avatar" className="avatar"/>
                <h4>{user.name}</h4>
            </div>
            <div className={`user_status ${user.isOnline ? 'online' : 'offline'}`}></div>
        </div>
    </div>
  )
}

export default User