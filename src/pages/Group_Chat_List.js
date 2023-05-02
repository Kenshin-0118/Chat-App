import React, { useRef, useState, useEffect} from 'react'
import { db } from './firebase'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'


function Groups() {
    const [Accounts, setAccounts] = useState([]);
    useEffect(()=>{
      const que = query(collection(db,"groups"),orderBy('created'));
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
      <div className='flex-grow h-full flex-col'>
        <div className=''>Users</div>
          {Accounts && Accounts.map((users) => (
            <li className='bg-purple-100 rounded-lg mr-3 ml-3 mb-3 items-center flex' key={users.uid}>
              <div className='w-1/5'><img className='p-1' src={users.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/></div>
              <div className='w-4/5 text-bold text-3xl'>{users.Name}</div>
              
            </li>
          ))}
      </div>
      
    );
}


export default Groups;
