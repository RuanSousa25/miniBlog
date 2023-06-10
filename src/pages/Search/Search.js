import React from 'react'
import styles from "./Search.module.css";
import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { PostDetails } from '../../components/PostDetails';
const Search = () => {

    const query = useQuery();
    const search = query.get("q");

    const {documents: posts} = useFetchDocuments("posts", search);
  return (
    <div className={styles.search_container}> 
        <h2>Pesquisa</h2>
   
            {posts && posts.length === 0 && 
                <div>
                    <p>Não foram encontrados posts a partir de sua busca...</p>
                    <Link to="/" className="btn btn-dark">voltar</Link>
                </div>
            }
            {posts && posts.map((post)=>(
                <PostDetails key={post.id} post={post}/>
            ))}
      

    </div>
   
  )
}

export default Search