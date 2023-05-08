import React, { useRef, useState, useEffect} from 'react'
import { db,auth } from './firebase'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'


function ChatList({setUserTarget,setMenu}) {
  const [messages, setMessages] = useState([]);
  const { uid } = auth.currentUser
  
  const mymessages = messages.filter(convo => convo.P1_ID == uid || convo.P2_ID == uid);
  useEffect(() => {
  const collectionRef = query(collection(db,"messages"),orderBy('created', "desc"));

  // Listen for changes in the collection
  onSnapshot(collectionRef, (querySnapshot) => {
    // Reduce the query snapshot to an object with one message per UID
    const messagesByUid = querySnapshot.docs.reduce((acc, doc) => {
      const message = { id: doc.id, ...doc.data() };
      // Check if the UID is already in the object
      if (!acc[message.Convo_Id]) {
        // If not, add the message to the object under the UID key
        acc[message.Convo_Id] = message;
      }
      return acc;
    }, {});
  
    // Convert the object to an array of values
    const messagesArray = Object.values(messagesByUid);
  
    // Set the state with the array of messages
    setMessages(messagesArray);
  });
}, []);

  function limittext(message){
    return String(message).length > 60 ? message.slice(0,60) + " . . . " : message;
  }

  const ConvoClicked=(index, user)=>{ 
    if(user.P1_ID == uid){
      setUserTarget({Target_Name: user.P2_Name, Target_uid: user.P2_ID,Target_photoURL:user.P2_PhotoURL, index: index})
      setMenu('Chatroom')
    }
    else{
      setUserTarget({Target_Name: user.P1_Name, Target_uid: user.P1_ID,Target_photoURL:user.P1_PhotoURL, index: index})
      setMenu('Chatroom')
    }
    
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
  
    return (
      <div>
        <div className=''>        
            {mymessages.map((chat,index) => (
              <li onClick={() => ConvoClicked(index, chat)} className='bg-neutral-800 rounded-lg mr-3 ml-3 mb-3 items-center flex' key={chat.Convo_Id}>
                {chat.uid == uid ?
      <>
                <div className='w-1/5'><img className='p-1' src={chat.P2_PhotoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/></div>
                <div className='w-3/5'>
                  <div className='bold text-2xl text-white'>{chat.P2_Name}</div>
                  <div className='italic text-md text-white'>You: {chat.Text?limittext(chat.Text):'Unsent a message'}</div>
                </div>
                <div className='w-1/5 text-md text-white'><i>{ getdatetime(chat.created)}</i></div>
        </> 
      : 
      <>
      <div className='w-1/5'><img className='p-1' src={chat.P1_PhotoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/></div>
      <div className='w-3/5'>
        <div className='bold text-2xl text-white'>{chat.P1_Name}</div>
        <div className='italic text-md text-white'><b>{chat.Text?limittext(chat.Text):'Unsent a message'}</b></div>
      </div>
      <div className='w-1/5 text-md text-white'><i>{ getdatetime(chat.created)}</i></div>
</> }
              </li>
            ))}
        </div>
      </div>
    );
}


export default ChatList;