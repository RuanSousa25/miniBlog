import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";

const CreatePost = () => {
  const [title, setTitle]= useState("");
  const [image, setImage] = useState("");
  const [body,setBody]= useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(null);

  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  return (
    <div>
        <h1>CreatePost</h1>
        <p>O que está pensando?</p>
        <form onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input 
                type="text" 
                name="title" 
                required 
                placeholder="Sobre o que quer falar?" 
                onChange={(e)=>setTitle(e.target.value)} 
                value={title}></input>
            </label>
            <label>
              <span>Imagem</span>
              <input 
                type="text" 
                name="image" 
                required 
                placeholder="Insira uma imagem que representa seu post" 
                onChange={(e)=>setImage(e.target.value)} 
                value={image}></input>
            </label>
            <label>
              <span>Conteúdo: </span>
             <textarea 
              name="body" 
              required 
              placeholder="Insira o conteúdo"
              onChange={(e)=>setBody(e.target.value)}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input 
                type="text" 
                name="image" 
                required 
                placeholder="Insira as tags separadas por vírgulas" 
                onChange={(e)=>setImage(e.target.value)} 
                value={image}></input>
            </label>
        
        </form>
    </div>
  )
}

export default CreatePost