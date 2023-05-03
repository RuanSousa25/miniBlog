import React from 'react'
import styles from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../contexts/AuthContext';
const Navbar = () => {
    const {user} = useAuthValue();
    return(
    <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink 
                to='/'
                className={({isActive}) =>(isActive ? styles.active: "")} 
                >Home</NavLink>
            </li>
            {!user && (
                <>
                <li>
                <NavLink 
                to='/Login' 
                className={({isActive}) =>(isActive ? styles.active: "")} 
                >Entrar</NavLink>
            </li>
            <li>
                <NavLink 
                to='/Register' 
                className={({isActive}) =>(isActive ? styles.active: "")} 
                >Cadastrar</NavLink>
            </li>
            </>
            )}
            {user && (
                <>
                     <li>
                <NavLink 
                to='/posts/create' 
                className={({isActive}) =>(isActive ? styles.active: "")} 
                >Novo Post</NavLink>
            </li>
            <li>
                <NavLink 
                to='/Dashboard' 
                className={({isActive}) =>(isActive ? styles.active: "")} 
                >Dashboard</NavLink>
            </li>
                </>
            )}
            <li>
                <NavLink 
                to='/About' 
                className={({isActive}) =>(isActive ? styles.active: "")} 
                >Sobre</NavLink>
            </li>
            
        </ul>
    </nav>
  )
}

export default Navbar