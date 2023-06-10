import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
const EditPost = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument("posts",id);
  const [title, setTitle]= useState("");
  const [image, setImage] = useState("");
  const [body,setBody]= useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");


  useEffect(()=>{
    if(post){
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image)

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post])





  const {user} = useAuthValue();
  const {updateDocument, response} = useUpdateDocument("posts");
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
    const tagsArray = tags.split(",").map((tag)=>tag.trim().toLowerCase().replace("#","").replace(" ",""));
    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("por favor, preencha todos os campos!");
    }
    if(formError){
      return
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id,data)


    //redirect to home page
      navigate("/dashboard");
  }
  return (
    <div className={styles.edit_post}>
        {post && (
          <>
          <h1>Editando post: {post.title}</h1>
        <p>Altere os dados do post como desejar</p>
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
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title}></img>

            <label>
              <span>Conteúdo: </span>
             <textarea 
              name="body" 
              required 
              placeholder="Insira o conteúdo"
              onChange={(e)=>setBody(e.target.value)}
              value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input 
                type="text" 
                name="image" 
                required 
                placeholder="Insira as tags separado-as por vírgulas" 
                onChange={(e)=>setTags(e.target.value)} 
                value={tags}></input>
            </label>
            {/* <button className="btn">Postar</button> */}
             {!response.loading && <button className="btn">Editar</button>}
          {response.loading && <button className="btn" disabled>Aguarde</button>}
          {formError && <p className="error">{formError}</p>}
        
        </form>
          </>
        )}
    </div>
  )
}

export default EditPost;