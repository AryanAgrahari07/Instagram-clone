import React ,{ useState, useEffect } from 'react';
import './App.css';
import Post from './post'
import {collection,onSnapshot} from 'firebase/firestore'
import {db,auth} from './firebase'
import{createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged,updateProfile} from 'firebase/auth'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import Imageupload from './imageup.js';
// import { orderBy } from "firebase/firestore";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [posts,setPosts] = useState([
    // {username : "aryan_agrahari_7",
    //  imageurl : "https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg=" ,
    //  caption : "this is project on instagram clone using react js with the help of clever programmer"
    // },
  ]);
  
     const [user,setuser] = useState(null);
   
  
     useEffect(() =>{

     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if(authUser){
          console.log(authUser);
          setuser(authUser);
            if(authUser.displayName){

            } else{
              return updateProfile(authUser, {
                displayName: username,
              });  
            }
          }
            else{
              setuser(null);
          }})
       return () => {
          unsubscribe();
       }
    }
    , [user,username]);


    useEffect(() =>{
       getPosts();

    }
    , []);

    const getPosts = async ()=>{
      onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      })));
  })
  }
  
    const signIn = (event) =>{
    event.preventDefault();

    signInWithEmailAndPassword(auth,email,password)
    .catch((error) => alert(error.message))
  
    setOpenSignIn(false);
  } 

    const signUp = (event)=>{
    event.preventDefault();

    createUserWithEmailAndPassword(auth,email, password)

  .catch((error) => {
   console.log("error found");
   alert(error.message);
    // ..
  });
  setOpen(false);
}

  return (
    <div className="App">
    

       <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Box sx={style} >
          <form className='app_signup'>
          <center>
            <img
            className='app_headerImage'
            src='https://www.91-cdn.com/hub/wp-content/uploads/2019/02/Instagram-Featured.jpg'
            alt=''
           />
          </center>

           <Input 
             placeholder='username'
             type='text'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
           />
           <Input 
             placeholder='email'
             type='text'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
           <Input 
             placeholder='password'
             type='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <Button type="submit" onClick={signUp}>Sign Up</Button>
           </form>
        </Box>

      </Modal>
    
      
    
       <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
        <Box sx={style} >
          <form className='app_signup'>
          <center>
            <img
            className='app_headerImage'
            src='https://www.91-cdn.com/hub/wp-content/uploads/2019/02/Instagram-Featured.jpg'
            alt=''
           />
          </center>
        
           <Input 
             placeholder='email'
             type='text'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
           <Input 
             placeholder='password'
             type='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <Button type="submit" onClick={signIn}>Sign In</Button>
           </form>
        </Box>

      </Modal>
  
    <div className='header_app'>
        
         <div className='header_logo'>
          {/* <img className='header_logo_img' src='' alt=''/> */}
          <h1  className='header_logo_img' >Gen-Z</h1>
         </div>
         <div className='header_logo'>  
         </div>

         {user ? (
     <div className='app__headerright'>
     <Button onClick={()=> auth.signOut()}>Logout</Button>
            </div>
    ):(
      <div className="app__loginContainer">
      <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={()=> setOpen(true)}>Sign Up</Button>
      </div>
     )}
       
    </div>
    

    <div className="app__posts">
<div className='app_leftpost'>
    {
      posts.map(({id,post}) => (
        <Post key={id} postId={id} user={user} username={post.username} imageurl={post.imageurl} caption={post.caption}  />
      ))
    }
   
   </div>
       </div>



       {user?.displayName ? (
         <Imageupload username = {user.displayName}/>
      ):(
        <h3>Login to upload posts</h3>
      )}
     
 
   </div>

    
  );}

  export default App;
