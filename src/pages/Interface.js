import { auth,db } from '../config/firebase'
import React, { useRef, useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from "react-google-button"
import firebase from 'firebase/app';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDocs,deleteDoc} from 'firebase/firestore'
import Users from './Users'
import ChatList from './Chat_list'
import GroupList from './Group_Chat_List'
import Create_G from './Create_Group'
import Join_G from './Join_Group'
import Grouproom from './Grouproom'
import Chatroom from './Chatroom'



function Interface(settext) {
  const [menu, setMenu] = useState('Messages');
  const [leave, setLeave] = useState(false);
  const [grouptarget, setGroupTarget] = useState([]);
  const [usertarget, setUserTarget] = useState([]);
  function changeMenu(event) {
    setMenu(event.target.value)
    setLeave(false)
  }
  function limittext(message){
    return String(message).length > 15 ? message.slice(0,15) + " . . . " : message;
  }
  async function LeaveGroup(){
    const { uid } = auth.currentUser
    const collectionRef = collection(db, "groups");
    const queryRef = query(collectionRef,where('Group_ID', '==', grouptarget.Group_ID),where('uid', '==', uid));
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    setLeave(false)
    setMenu('Groups')
  }
  function getMenu() {
    switch (menu) {
      // eslint-disable-next-line
      case 'Messages': return <ChatList setMenu={setMenu} setUserTarget = {setUserTarget}/>; break;
      // eslint-disable-next-line
      case 'Groups': return <GroupList setMenu={setMenu} setGroupTarget={setGroupTarget}/>; break;
      // eslint-disable-next-line
      case 'Users': return <Users setMenu={setMenu} setUserTarget = {setUserTarget}/>; break;
      // eslint-disable-next-line
      case 'Create Group': return <Create_G setMenu={setMenu}/>; break;
      // eslint-disable-next-line
      case 'Join Group': return <Join_G setMenu={setMenu}/>; break;
      // eslint-disable-next-line
      case 'Grouproom': return <Grouproom setMenu={setMenu} grouptarget={grouptarget}/>; break;
      // eslint-disable-next-line
      case 'Chatroom': return <Chatroom setMenu={setMenu} usertarget={usertarget}/>; break;
      default: return 'Error 404: Page not found';
    }
  }
  return (
    <div className="">
      <div className='flex  h-[8vh]'>
      <div className='ml-[30px] w-1/2 flex font-bold text-white text-left text-4xl  py-3'>{menu === 'Grouproom'? limittext(grouptarget.Group_name): menu}
      
      </div>
      {menu === 'Groups' ?
      <div className='w-1/2 flex-grow items-right py-4 px-2 justify-between' >
          <button value={'Join Group'} onClick={changeMenu} className='w-2/5 mr-[5px] shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
            Join
          </button> 
          <button value={'Create Group'} onClick={changeMenu} className='w-2/5 ml-[5px] shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
            Create
          </button>
        </div> 
      : null}
      
      {menu === 'Grouproom' ?
      <div className='w-1/2 flex-grow items-right py-2 px-2' >

        {leave? 
        <div className=' flex-grow items-right py-2 px-2 justify-between' >
          <button onClick={LeaveGroup} className='w-2/5 mr-[5px] shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
            Confirm
          </button> 
          <button onClick={(e) => setLeave(false)} className='w-2/5 ml-[5px] shadow bg-gray-600 hover:bg--500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
            Cancel
          </button>
        </div> :
        <div className=' flex-grow items-right py-2 px-2 justify-between' >
          <button onClick={(e) => setLeave(true)} className='w-3/5 ml-[10vh] shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
              Leave Group
          </button>
        </div> }

        </div> 
      : null}
      </div>
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
