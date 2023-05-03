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
import Create_G from './Create_Group'
import Join_G from './Join_Group'



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
      // eslint-disable-next-line
      case 'Create Group': return <Create_G/>; break;
      // eslint-disable-next-line
      case 'Join Group': return <Join_G/>; break;
      default: return 'Error 404: Page not found';
    }
  }
  return (
    <div className="">
      <div className='ml-[30px] w-[720px] flex h-[7vh] font-bold text-left text-4xl  py-3'>{menu}
      {menu === 'Groups' ?
      <div className='ml-[370px] flex-grow gap-5 items-right'>
          <button value={'Join Group'} onClick={changeMenu} className='shadow bg-orange-500 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
            Join
          </button> 
          <button value={'Create Group'} onClick={changeMenu} className='ml-5 shadow bg-orange-500 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
            Create
          </button>
        </div> 
      : null}</div>
        <main className='flex-grow h-[73vh]' >{getMenu()}</main>
        <div className='footer fixed bottom-0 w-full max-w-[720px] py-2 px-2 flex justify-between'>
  <button className='bg-orange-700 w-1/3 h-[8vh] hover:bg-orange-500 rounded' value={'Messages'} onClick={changeMenu} type="submit">Messages</button>
  <button className='bg-orange-700 w-1/3 h-[8vh] hover:bg-orange-500 rounded mx-2' value={'Groups'} onClick={changeMenu} type="submit">Groups</button>
  <button className='bg-orange-700 w-1/3 h-[8vh] hover:bg-orange-500 rounded' value={'Users'} onClick={changeMenu} type="submit">Users</button>
</div>


    </div>
  );
}

const Logout= () => {
  return (
    <div  ><button className="sign-out text-center" onClick={() => auth.signOut()}>Sign Out</button></div>
  )
}
export default Interface;
