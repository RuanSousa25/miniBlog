import React from "react";
import styles from './About.module.css'; // Import css modules stylesheet as styles
import { Link } from "react-router-dom";
export default function About(){
    return(
        <div className={styles.about}>
            <h2>
                Sobre o Mini <span>Blog</span>
            </h2>
            <p>
                Este projeto consiste em um blog feito com ReactJs no front-end e Firebase no back-end.
            </p>
            <Link to="/posts/create" className="btn">
                Criar Post
            </Link>
        </div>
    )
}