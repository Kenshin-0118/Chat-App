import { auth,db } from '../config/firebase'
import React, { useRef, useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from "react-google-button"
import firebase from 'firebase/app';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDocs} from 'firebase/firestore'
import Interface from './Interface'



function MainStream() {
  const [user] = useAuthState(auth);
  console.log(user)
  const [text,settext] = useState("Chat App Project")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      
      if (user) {
        const { uid, email, photoURL, displayName } = user;
        let added = 0;
        // Check if user document already exists in Firestore
        const doc = query(collection(db,"users"),where('uid', '==', uid));
        const check = onSnapshot(doc, (querySnapshot)=>{
          getDocs(doc)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              added = ++added
            });
          }).then(()=>{
            console.log(added)
            if (added == 0) {
              const { uid, photoURL, email, displayName } = auth.currentUser
               addDoc(collection(db, 'users'), {
               Name: displayName,
               uid,
               email,
               photoURL,
               created: serverTimestamp()
             });
            }
          })         
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        
      });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <header>
        <div className='font-bold text-3xl'>{text}</div>
        {user ? <Logout/> : <SignIn />}
      </header>

      <section>
    {user ? (<Interface settext = {settext}/>) : (<Login />)}
  </section>

    </div>
  );
}
const SignIn = () => {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful sign-in here
    })
    .catch((error) => {
      if (error.code === 'auth/cancelled-popup-request') {
        // Handle cancelled sign-in here
        console.log('User cancelled the sign-in process');
      } else {
        // Handle other sign-in errors here
        console.error(error);
      }
    });
  }

  return (
    <div >
      <GoogleButton  className="sign-in" onClick={signInWithGoogle}>Sign in with Google</GoogleButton>
    </div>
  )
}
const Logout= () => {
  return (
    <div  ><button className="sign-out text-center" onClick={() => auth.signOut()}>Sign Out</button></div>
  )
}
const Login = () => {
  return (
    <>
      <h1>
      In Partial Fulfillment of the Requirements<br/>
      for the Subject WS 101<br/><br/>
      Please Login Using the button in the Upper Right Corner<br/>
      using your Google Account to Enter the ChatRoom 
      </h1>
    </>
  )
}

export default MainStream;
