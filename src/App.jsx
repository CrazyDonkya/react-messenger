import './App.css'
import 'firebase/compat/firestore'
import "firebase/compat/auth";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/auth';


function App() {

  return (
    <AuthProvider className="App">
      <Router>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/profile' element={<Profile/>}/>
            </Route>
            <Route exact path='/login' element = {<Login/>}/>
            <Route exact path='/register' element = {<Register/>}/>
          </Routes>
      </Router>
    </AuthProvider>
  )
}


export default App
