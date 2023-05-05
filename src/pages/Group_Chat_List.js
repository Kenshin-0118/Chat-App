import React, { useRef, useState, useEffect} from 'react'
import { auth,db } from './firebase'
import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'


function Groups({setMenu,setGroupTarget}) {
    const [Groups, setGroups] = useState([]);
    useEffect(()=>{
      const { uid } = auth.currentUser
      const que = query(collection(db,"groups"), where('uid', '==', uid),orderBy('created'));
      const Unsubscribe = onSnapshot(que, (querySnapshot)=>{
        let groups = []
        querySnapshot.forEach((doc) => {
            if (!groups.includes(doc.data().Name)) {
          groups.push({...doc.data(), id: doc.id})}
        })
        setGroups(groups)
      })
      return () => Unsubscribe
  
    },[])

    const GroupClicked=(index, Group)=>{ 
      setGroupTarget({Group_name: Group.Group_Name, Group_ID: Group.Group_ID, index: index})
      setMenu('Grouproom')
  } 
  
    return (
      <div className=''>        
      {Groups.map((group,index) => (
        <li className='bg-neutral-800 text-white rounded-lg mr-3 ml-3 mb-3 items-center flex px-4 py-4' key={group.Group_ID}>
          <div className='w-2/3'>
            <div className='bold text-2xl'>{group.Group_Name}</div>
            <div className='italic text-md'>{'Group ID: '+group.Group_ID}</div>
          </div>
          <div className='w-1/3 flex gap-5 flex justify-center flex-col items-center'>
          <button onClick={() => GroupClicked(index, group)} className=' shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
            Enter Chatroom
          </button>
          </div>
        </li>
      ))}
  </div>
      
    );
}


export default Groups;
