import React, { useRef, useState, useEffect} from 'react'
import { db,auth } from '../config/firebase'
import {collection, onSnapshot, orderBy, query,where} from 'firebase/firestore'


function Users({setUserTarget,setMenu}) {
  const { uid } = auth.currentUser
    const [Accounts, setAccounts] = useState([]);
    const filteredAccounts = Accounts.filter(account => account.uid != uid);
    useEffect(()=>{
      const que = query(collection(db, "users"), orderBy('Name'));
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

    const UserClicked=(index, user)=>{ 
      setUserTarget({Target_Name: user.Name, Target_uid: user.uid,Target_photoURL:user.photoURL, index: index})
      setMenu('Chatroom')
  } 
  
    return (
      <div className='flex-grow h-full flex-col'>
          {filteredAccounts && filteredAccounts.map((users,index) => (
            <li className='bg-neutral-800 rounded-lg mr-3 ml-3 mb-3 items-center flex' key={users.uid}>
              <div className='w-1/5'><img className='p-1' src={users.photoURL?users.photoURL: 'https://www.freeiconspng.com/thumbs/question-mark-icon/orange-question-mark-icon-png-clip-art-30.png'} alt='Failed to Load'/></div>
              <div className='w-3/5 text-bold text-white text-3xl'>{users.Name?users.Name:'Unknown'}</div>
              <div className='w-1/5 text-bold text-3xl mt-[-12px] items-center flex'>
              <button onClick={() => UserClicked(index, users)} className="mt-3 shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Message
              </button></div>
            </li>
          ))}
      </div>
      
    );
}


export default Users;
