import {db} from "../firebase/config";
import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState,useEffect } from "react";

export const useAuthentication=()=>{
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(null);


    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

   function checkIfIsCancelled(){
    if(cancelled){
        return;
    }

   }

   //register
   const createUser = async(data)=>{
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try{
        const {user} = await createUserWithEmailAndPassword(
            auth,data.email,data.password
        )
        await updateProfile(user,{
            displayName: data.displayName

        })
        setLoading(false);
        return user;
    }catch(e){


        let sysError;
        if(e.message.includes("Password")){
            sysError = "A senha precisar conter pelo menos 6 caracteres";
        }else if(e.message.includes("email-already")){
            sysError = "O email informado já está em uso"
        }else{
            sysError = "ocorreu um erro inesperado, tente mais tarde"
        }

        setError(sysError);
        

    }
    setLoading(false);
    
   }

   const logout = () =>{
    checkIfIsCancelled();
    signOut(auth);
   }
   const login = async(data)=>{
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try{
        await signInWithEmailAndPassword(auth,data.email,data.password);
        
    }
    catch(e){
        let sysError;
        if(e.message.includes("user-not-found")){
            sysError = "Usuário não encontrado";
        }else if(e.message.includes("wrong-password")){
            sysError = "Senha incorreta";
        }else{
            sysError = "Erro inesperado, tente mais tarde";
        }
        setError(sysError);
    }
    setLoading(false);
   }

   useEffect(()=>{
    return ()=> setCancelled(true)
   },[]); 

   return {
    auth, createUser,error,loading,logout,login
   }
}