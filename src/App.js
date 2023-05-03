import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';


//pages

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user);
    });
  }, [auth])


  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
     <AuthProvider value={{user}}>
     <BrowserRouter>
     <Navbar/>
        <div className='container'>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route 
                path='/About' 
                element={<About/>}
              />
              <Route 
                path='/Login' 
                element={!user?<Login/>:<Navigate to="/"/>}
              />
              <Route 
                path='/Register' 
                element={!user?<Register/>:<Navigate to="/"/>}
              />
              <Route 
                path='/Posts/create' 
                element={user?<CreatePost/>:<Navigate to="/Register"/>}
              />
              <Route 
                path='/Dashboard' 
                element={user?<Dashboard/>:<Navigate to="/Register"/>}
              />
          </Routes>
        </div>
      <Footer/>
     </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;