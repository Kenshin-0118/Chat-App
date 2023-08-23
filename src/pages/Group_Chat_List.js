import React, { useRef, useState, useEffect} from 'react'
import { auth,db } from '../config/firebase'
import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'


function Groups({setMenu,setGroupTarget}) {
    const [Groups, setGroups] = useState([]);

    useEffect(()=>{
      const uid = auth.currentUser?.uid || 0;
      const que = query(collection(db,"groups"), where('uid', '==', uid),orderBy('created','desc'));
      const Unsubscribe = onSnapshot(que, (querySnapshot)=>{
        let groups = []
        querySnapshot.forEach((doc) => {
            if (!groups.includes(doc.data().Name)) {
          groups.push({...doc.data(), id: doc.id})}
        })
        setGroups(groups)
      })
      return () => Unsubscribe
    
    },[Groups]) 

    function limittext(message){
      return String(message).length > 40 ? message.slice(0,40) + " . . . " : message;
    }

    function getdatetime(timestamp){
      if(timestamp == null){
        const text2 = String(Date.now());
        const text3 = text2.slice(4, 21);
        return text3;
      }
      else if(timestamp != null){
      const text2 = String((timestamp).toDate());
      const text3 = text2.slice(4, 21);
      return text3;
    }
    }
    

    const GroupClicked=(index, Group)=>{ 
      setGroupTarget({Group_name: Group.Group_Name, Group_ID: Group.Group_ID, index: index})
      setMenu('Grouproom')
  } 

  const GetGroupId=(Group)=>{ 
    const groupId = Group.Group_ID.toString();
    navigator.clipboard.writeText(groupId)
    .then(() => {
      // Show a popup message
      const popup = document.createElement('li');
      popup.textContent = Group.Group_Name+"'s Group Id have been copied to clipboard";
      popup.classList.add('popup');
      document.body.appendChild(popup);

      // Automatically hide the popup after a certain time (e.g., 3 seconds)
      setTimeout(() => {
        popup.remove();
      }, 2000);
    })
    .catch((error) => {
      console.error("Failed to copy Group Id:", error);
    });
  } 
  
  
    return (
      <div className=''>        
      {Groups.map((group,index) => (
        <li onDoubleClick={() => GetGroupId(group)} className='bg-neutral-800 text-white rounded-lg mr-3 ml-3 mb-3 items-center flex px-4 py-4' key={group.Group_ID}>
          <div className='w-2/3'>
            <div className='bold text-2xl'>{group.Group_Name}</div>
            <div className='italic text-md'>{group.SenderUID == (auth.currentUser && auth.currentUser.uid) || false?limittext('You: '+(group.Text ? group.Text : 'Unsent a Message')) : <b>{limittext(group.Sender+': '+(group.Text ? group.Text : 'Unsent a Message'))}</b> }<br/>{getdatetime(group.created)}</div>
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
