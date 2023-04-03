// import React, { useState } from 'react'
import  './post.css'
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, query,orderBy,serverTimestamp ,addDoc } from "firebase/firestore";
import { db } from "./firebase";

function Post({username,imageurl,caption,postId,user}) {
     const[comments,setComments] = useState([]);
     const[comment,setComment] = useState([]);
     
    
    useEffect(() => {
     let unsubscribe;
 
     if (postId) {
       const postCommentsRef = query(
         collection(doc(db, "posts", postId), "comments"),
         orderBy("timestamp", "desc")
       );
 
       unsubscribe = onSnapshot(postCommentsRef, (snapshot) => {
         setComments(snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       })));
       });
     }
 
     return () => {
       if (unsubscribe) {
         unsubscribe();
       }
     };
   }, [postId]);


const postComment = async (event) => {
     event.preventDefault();
 
     const commentsRef = collection(doc(db, "posts", postId), "comments");
 
     await addDoc(commentsRef, {
       text: comment,
       userName: user.displayName,
       timestamp: serverTimestamp(),
     });
 
     setComment("");
   };

  return (
    <div className='post'>
         <div className='post_header'>
               <div className='header_img'>
          <Avatar 
          className='post__avatar'
          alt={username} src={imageurl} />
               </div>
            <strong>{username}</strong> 
         </div>

         <div className='post_img'>
              <img className='img_post' src={imageurl} alt=''/>
         </div>

         
         <div className='post_description'>
            <p><strong>{username}</strong> {caption} </p>
         </div>

         <h3 className='comments_heading'> Comments </h3>
         <div className="post_comments">
        
        {comments.map((comment) => (
          <p className='comment_p' key={comment.id}>
            <Avatar className="post_avatar"  />
            <strong className='cmt_name'>{comment.userName}</strong>    :    {comment.text} 
          </p>
        ))}
      </div>
         
{
     user&&( <form className='post__commentBox'>
     <input
        className='post__input'
        type='text'
        placeholder='Add a comment....'
        value={comment}
        onChange={(e) => setComment(e.target.value)}/>
     <button 
     className='post__button'
     disabled={!comment}
     type='submit'
     onClick={postComment}
     >
          Post
     </button>
    </form>

     )
}


        
    </div>
  )
}

export default Post