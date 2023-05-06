import React, { useRef, useState, useEffect} from 'react'
import { auth, db } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from "react-google-button"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp,where, getDocs, updateDoc} from 'firebase/firestore'


function Grouproom({grouptarget}) {
  const autoscroll = useRef(0);
  useEffect(() => autoscroll.current.scrollIntoView({behavior: 'smooth'}));
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    const que = query(collection(db,"group_messages"),where('Group_ID', '==', grouptarget.Group_ID),orderBy('created'));
    const Unsubscribe = onSnapshot(que, (querySnapshot)=>{
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})
      })
      setMessages(messages)
    })
    return () => Unsubscribe

  },[])
  console.log('Messages: '+messages)

  const [TxtMessage, setTxtMessage] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault()
    if (TxtMessage === '') {
      alert('Please Enter Message in the Text Field')
      return;
    }
    const { uid, photoURL,displayName } = auth.currentUser
     await addDoc(collection(db, 'group_messages'), {
      Group_ID: grouptarget.Group_ID,
      Text: TxtMessage,
      Name: displayName,
      created: serverTimestamp(),
      uid,
      photoURL
    });
    const collectionRef = collection(db, "groups");
    const queryRef = query(collectionRef, where("Group_ID", "==", grouptarget.Group_ID));
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {
      console.log('Doc Ref: '+doc.ref)
      updateDoc(doc.ref, {
        created: serverTimestamp(),
        Text: TxtMessage,
        Sender: displayName,
        SenderUID: uid
      });
    });
    
    setTxtMessage('');
  }

  return (<>
    <main>

      {messages && messages.map((message) => <ChatMessage key={message.id} message = {message}/>)}

      <div ref={autoscroll} id="bottom"/>

    </main>
    <form  onSubmit={sendMessage}>

      <input value={TxtMessage} onChange={(e) => setTxtMessage(e.target.value)} placeholder="Enter Message" />

      <button className='bg-orange-600' type="submit">Send</button>

    </form>
  </>)
}


function ChatMessage({message}) {
   const messageClass = 
  message.uid === auth.currentUser.uid
  ? `sent`
  : `received`
  // eslint-disable-next-line
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
  return (<div ><div className={`message ${messageClass} mt-5`}>
      <img src={message.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/>
      <p><n><i>{message.Name}</i></n><br/>{message.Text}<br/><t><i>{ getdatetime(message.created)}</i></t></p>
  </div></div>)
}


export default Grouproom;
