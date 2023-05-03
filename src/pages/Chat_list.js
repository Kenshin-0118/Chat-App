import React, { useRef, useState, useEffect} from 'react'
import { db } from './firebase'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'


function ChatList() {
  const [messages, setMessages] = useState([]);
  
  const collectionRef = query(collection(db,"messages"),orderBy('created', "desc"));

  // Listen for changes in the collection
  onSnapshot(collectionRef, (querySnapshot) => {
    // Reduce the query snapshot to an object with one message per UID
    const messagesByUid = querySnapshot.docs.reduce((acc, doc) => {
      const message = { id: doc.id, ...doc.data() };
      // Check if the UID is already in the object
      if (!acc[message.uid]) {
        // If not, add the message to the object under the UID key
        acc[message.uid] = message;
      }
      return acc;
    }, {});
  
    // Convert the object to an array of values
    const messagesArray = Object.values(messagesByUid);
  
    // Set the state with the array of messages
    setMessages(messagesArray);
  });

  function limittext(message){
    return String(message).length > 60 ? message.slice(0,60) + " . . . " : message;
  }
  
    return (
      <div>
        <div className=''>        
            {messages.map((chat,index) => (
              <li className='bg-purple-100 rounded-lg mr-3 ml-3 mb-3 items-center flex' key={chat.uid}>
                <div className='w-1/5'><img className='p-1' src={chat.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/></div>
                <div className='w-4/5'>
                  <div className='bold text-2xl'>{chat.Name}</div>
                  <div className='italic text-md'>{limittext(chat.Text)}</div>
                </div>
              </li>
            ))}
        </div>
      </div>
    );
}


export default ChatList;