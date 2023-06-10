import React from "react"
import styles from "./Home.module.css";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { PostDetails } from "../../components/PostDetails";

export default function Home(){
    const [query,setQuery] = useState("");
    const {documents: posts, loading} = useFetchDocuments("posts");
    const navigate = useNavigate();


    const handleSubmit= (e)=>{
        e.preventDefault();
        if(query){
          
            return navigate(`/search?q=${query.replace("#","").replace(" ","").trim()}`);
        }
    }

    return(
        <div className={styles.home}>
            <h1>
                Veja Nossos Posts Mais Recentes
            </h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input 
                    type="text"
                    placeholder="ou busque por tags..." 
                    onChange={(e)=>{ setQuery(e.target.value)}}
                ></input>
                <button className="btn btn-dark">Pesquisar</button>
            </form>
            <div>
                {
                    loading && (<p>Carregando...</p>)
                }
                {
                    posts && posts.map((post)=>(
                       <PostDetails key={post.id} post={post}></PostDetails>
                    ))
                }
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to="/posts/create" className="btn">Criar primeiro post</Link>
                    </div>
                )}
            </div>
        </div>
    )
}