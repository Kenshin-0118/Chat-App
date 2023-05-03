import { auth,db } from './firebase'
import React, { useRef, useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from "react-google-button"
import firebase from 'firebase/app';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDocs} from 'firebase/firestore'
import Users from './Users'
import ChatList from './Chat_list'
import GroupList from './Group_Chat_List'



function Create() {
    const [Name, setName] = useState('')

  const NameChange = (e) => {
    setName('jgsa')
}

  return (
    <div className="flex justify-center flex-col items-center content-center h-full">
          <div className="text-xl">
                <input className=" w-[400px] shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" placeholder="Group Name" onChange={NameChange} id="username" type="text"/><br/>
                <button className=" w-[200px] ml-[100px] mt-3 shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold rounded flex justify-center" type="button">
                  Create Group
                </button>
             </div>
</div>
  );
}

export default Create;
