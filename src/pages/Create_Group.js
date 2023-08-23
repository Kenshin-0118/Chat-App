import { auth,db } from '..config/firebase'
import React, { useRef, useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from "react-google-button"
import firebase from 'firebase/app';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDocs,setDoc} from 'firebase/firestore'
import Users from './Users'
import ChatList from './Chat_list'
import GroupList from './Group_Chat_List'



function Create({setMenu}) {
    const [Name, setName] = useState('')
    function Cancel(event) {
      setMenu('Groups')
    }
const usersRef = collection(db, "groups");
async function CreateGroup() {
  const userRef = doc(usersRef); // generate new document reference with random ID
  const id = userRef.id; // get the ID of the new document
 const { uid,photoURL, displayName } = auth.currentUser
  try {
    await setDoc(userRef, {// use the ID as a field value
      Group_Name: Name,
      Name: displayName,
      created: serverTimestamp(),
      photoURL,
      uid,
      Group_ID: id,
      Text: 'Group Have Been Created',
      Sender: displayName,
      SenderUID: uid
    });
    alert(Name+' Chatroom Created');
    setMenu('Groups')
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

  return (
    <div className="text-xl flex justify-center flex-col items-center h-full w-full">
      <div className="text-2xl font-bold flex justify-center flex-col items-center text-gray-500">Create New Group By<br/>Filling up Fields Below</div><br/>
        <input className=" w-[450px] shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" name="gname" placeholder="Group Name" onChange={(e) => setName(e.target.value)} id="username" type="text"/>
        <button onClick={CreateGroup} value={Name} className=" w-[200px] mt-3 shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold rounded flex justify-center" type="button">
            Create Group
        </button>
        <button onClick={Cancel} className=" w-[200px] mt-3 shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold rounded flex justify-center" type="button">
                Cancel
        </button>
    </div>
  );
}

export default Create;
