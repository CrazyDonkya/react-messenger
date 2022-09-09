import React from 'react'

const Profile = () => {
  return (
    <section>
        <div className='profile_container'>
            <div className='img_container'>
                <img src='' alt='avatar'/>
            </div>
            <div className='text_container'>
                <h3>User name</h3>
                <p>User email</p>
                <hr/>
                <div>Joined on: ...</div>
            </div>
        </div>
    </section>
  )
}

export default Profile