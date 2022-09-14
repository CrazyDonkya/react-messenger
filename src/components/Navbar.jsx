import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { auth, db } from '../firebase'
import {signOut} from 'firebase/auth'
import {updateDoc, doc} from 'firebase/firestore'
import {AuthContext} from '../context/auth'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const handleSingOut = async() => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline:false,
    })
    await signOut(auth)
    navigate('/login')
  }
  return (
    <nav>
        <h3>
            <Link to='/'>Messenger</Link>
        </h3>
            {user ? (
              <div>
                <Link to='/profile'>Profile</Link>
                <button className='btn' onClick={handleSingOut}>Logout</button>
              </div> 
            ) : (
              <div>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
              </div>
            )}
    </nav>
  )
}

export default Navbar