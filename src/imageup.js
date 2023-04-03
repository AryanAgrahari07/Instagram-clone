import React, { useState } from 'react'
// import {Button} from '@mui/material'
import {storage,db} from "./firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc ,serverTimestamp} from "firebase/firestore"; 
// import { unstable_useControlled as useControlled } from '@mui/utils';
// import './post.js'
import './imageup.css'

function Imageupload({username}) {
    const [image,setImage] = useState(null);
    const [progress,setProgress] = useState(0);
  
    const [caption,setCaption] = useState("");
    // const [imgUrl, setImgUrl] = useState(null);
    
    
// `images/${image.name}).put(image)`
    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
         }
    };

    const handleUpload = () => {
        // const uploadTask = storage.ref(`images/${image.name}).put(image)`);
        const storageRef = ref(storage, `images/${image.name}` );
        const uploadTask = uploadBytesResumable(storageRef, image);
        //  e.preventDefault();
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
            alert(error.message);
          },
           async () => {
                
                       const url = await getDownloadURL(uploadTask.snapshot.ref)
                        // setImgUrl(url)
                        console.log("file available at",url);

                        await addDoc(collection(db, "posts"), {
                    
                        username: username,
                        imageurl : url,
                        timestamp: serverTimestamp(),
                        caption : caption,
                            });
                         
                       });
                       setProgress(0);
                       setCaption('');
                       setImage('');
                   }
        // )
    // };
  return (
    <div className='imageupload'>
      <h2 className='head'>Upload Your Post</h2>
      <progress className='imageupload_progress' value={progress} max="100" />
      <input className='entera' type="text" placeholder='Enter a Caption' onChange={(event) => setCaption(event.target.value)
      } value={caption}/>

      <input className='fileup' type="file" onChange={handleChange}/>
      <button className='upload' onClick={handleUpload}>
        Upload
      </button>
    </div>

  )
}

export default Imageupload