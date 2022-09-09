import firebase from "firebase/compat/app";     
import {getAuth} from 'firebase/auth'       
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyBLkxgYTOkk7ftVz3KcsPHl1-Yn-CVSPCQ",
    authDomain: "mymessenger-e94c5.firebaseapp.com",
    projectId: "mymessenger-e94c5",
    storageBucket: "mymessenger-e94c5.appspot.com",
    messagingSenderId: "768097699297",
    appId: "1:768097699297:web:532c194bef62cb06b9fea0",
    measurementId: "G-L11R5CTTKP"
  })
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage}