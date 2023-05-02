import React, { useRef, useState, useEffect} from 'react'
import firebase from 'firebase/app';
import { auth, db } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from "react-google-button"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore'


function Group() {
    const [Accounts, setAccounts] = useState([]);
    useEffect(()=>{
      const que = query(collection(db,"users"),orderBy('created'));
      const Unsubscribe = onSnapshot(que, (querySnapshot)=>{
        let Accounts = []
        querySnapshot.forEach((doc) => {
            if (!Accounts.includes(doc.data().Name)) {
          Accounts.push({...doc.data(), id: doc.id})}
        })
        setAccounts(Accounts)
      })
      return () => Unsubscribe
  
    },[])
  
    return (
      <div>
        <h1>All Users</h1>
          {Accounts && Accounts.map((users) => (
            <li className='bg-purple-900 rounded-lg mr-10 ml-10 mb-10' key={users.uid}>
              <h1>Username: {users.Name}<br/>Email: {users.email}<br/>User Id: {users.uid}</h1>
            </li>
          ))}
      </div>
      
    );
}


export default Group;
