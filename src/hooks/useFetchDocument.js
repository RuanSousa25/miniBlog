import { useState, useEffect } from "react";
import {db} from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot, doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) =>{
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    const [cancelled, setCancelled] = useState(false);


    useEffect(()=>{
        async function loadDocument(){
            if(cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db,docCollection);

            try{

                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());
                setLoading(false);
            }catch(e){
                console.log(e);
                    setError(e.message);
                    setLoading(false);
            }
          
        
        }
        loadDocument();
    }, [docCollection, id, cancelled])

    useEffect(()=>{
        return ()=>setCancelled(true)
    },[])

    return {document, loading, error};
}