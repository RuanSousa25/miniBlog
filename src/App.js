
//styles
import './App.css';


//import de função
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './contexts/AuthContext';


//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/editPost/EditPost';




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
                path='/Search' 
                element={<Search/>}
              />
              <Route 
                path='/Posts/:id' 
                element={<Post/>}
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
                path='/Posts/edit/:id' 
                element={user?<EditPost/>:<Navigate to="/Register"/>}
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
