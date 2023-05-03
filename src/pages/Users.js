import React, { useRef, useState, useEffect} from 'react'
import { db } from './firebase'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'


function Users() {
    const [Accounts, setAccounts] = useState([]);
    useEffect(()=>{
      const que = query(collection(db,"users"),orderBy('Name'));
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
          {Accounts && Accounts.map((users,index) => (
            <li className='bg-neutral-800 rounded-lg mr-3 ml-3 mb-3 items-center flex' key={users.uid}>
              <div className='w-1/5'><img className='p-1' src={users.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/></div>
              <div className='w-3/5 text-bold text-white text-3xl'>{users.Name}</div>
              <div className='w-1/5 text-bold text-3xl mt-[-12px] items-center flex'>
              <button onClick={() =>userClicked(index)} className="mt-3 shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Message
              </button></div>
            </li>
          ))}
      </div>
      
    );
}


export default Users;
