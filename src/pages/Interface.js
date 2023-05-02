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



function Interface() {
  const [menu, setMenu] = useState(2);
  const [component, setComponent] = useState('chat');
  function changeMenu(event) {
    setMenu(parseInt(event.target.value));
  }

  function getMenu() {
    switch (menu) {
      // eslint-disable-next-line
      case 0: return <ChatList/>; break;
      // eslint-disable-next-line
      case 1: return <Users/>; break;
      // eslint-disable-next-line
      case 2: return <GroupList/>; break;
      default: return 'Error 404: Page not found';
    }
  }
  return (
    <div className="App w-full h-full">
        <div className='flex-grow overflow-y-auto' >{getMenu()}</div>
        <div className='footer fixed bottom-0 w-full max-w-[720px]'>
            <button className='bg-orange-700 w-1/3 hover:bg-orange-500' value={0} onClick={changeMenu} type="submit">Chat</button>
            <button className='bg-orange-700 w-1/3 hover:bg-orange-500' value={2} onClick={changeMenu} type="submit">Group</button>
            <button className='bg-orange-700 w-1/3 hover:bg-orange-500' value={1} onClick={changeMenu} type="submit">Users</button>
        </div>

    </div>
  );
}
export default Interface;
