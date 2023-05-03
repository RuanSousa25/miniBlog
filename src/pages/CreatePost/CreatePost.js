import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
const CreatePost = () => {
  const [title, setTitle]= useState("");
  const [image, setImage] = useState("");
  const [body,setBody]= useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const {user} = useAuthValue();
  const {insertDocument, response} = useInsertDocument("posts");
  const navigate = useNavigate();
  const handleSubmit =(e)=>{
    e.preventDefault();
    setFormError("");

    //validate img URL
    try{
      new URL(image);
    }
    catch(e){
      setFormError("A imagem precisa ser uma URL")
    }
    //criar o array de tags
    const tagsArray = tags.split(",").map((tag)=>tag.trim().toLowerCase());
    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("por favor, preencha todos os campos!");
    }
    if(formError){
      return
    }


    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })


    //redirect to home page
      navigate("/");
  }
  return (
    <div className={styles.create_post}>
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
                placeholder="Insira o URL de uma imagem que representa seu post" 
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
                onChange={(e)=>setTags(e.target.value)} 
                value={tags}></input>
            </label>
            {/* <button className="btn">Postar</button> */}
             {!response.loading && <button className="btn">Postar</button>}
          {response.loading && <button className="btn" disabled>Aguarde</button>}
          {formError && <p className="error">{formError}</p>}
        
        </form>
    </div>
  )
}

export default CreatePost