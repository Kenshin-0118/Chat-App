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



function Interface(settext) {
  const [menu, setMenu] = useState('Messages');
  function changeMenu(event) {
    setMenu(event.target.value)
  }
  function getMenu() {
    switch (menu) {
      // eslint-disable-next-line
      case 'Messages': return <ChatList/>; break;
      // eslint-disable-next-line
      case 'Groups': return <GroupList/>; break;
      // eslint-disable-next-line
      case 'Users': return <Users/>; break;
      default: return 'Error 404: Page not found';
    }
  }
  return (
    <div className="">
      <div className='ml-[30px] flex-grow h-[7vh] font-bold text-left text-4xl w-full py-3'>{menu}</div>
        <main className='flex-grow h-[73vh]' >{getMenu()}</main>
        <div className='footer fixed bottom-0 w-full h-[10vh] max-w-[720px]'>
            <button className='bg-orange-700 w-1/3 h-[10vh] hover:bg-orange-500 px-2' value={'Messages'} onClick={changeMenu} type="submit">Chat</button>
            <button className='bg-orange-700 w-1/3 h-[10vh] hover:bg-orange-500' value={'Groups'} onClick={changeMenu} type="submit">Group</button>
            <button className='bg-orange-700 w-1/3 h-[10vh] hover:bg-orange-500' value={'Users'} onClick={changeMenu} type="submit">Users</button>
        </div>

    </div>
  );
}
export default Interface;
