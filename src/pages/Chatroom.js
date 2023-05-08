import React, { useRef, useState, useEffect} from 'react'
import { auth, db } from './firebase'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where,getDocs,deleteField ,updateDoc,FieldValue} from 'firebase/firestore'


function Chatroom({usertarget}) {
  const autoscroll = useRef(0);
  const bottomRef = useRef(null);

  useEffect(() => 
  {if (autoscroll.current) {
    autoscroll.current.scrollIntoView({ behavior: 'smooth' });
  }}); 
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    const { uid } = auth.currentUser
    const que = query(collection(db,"messages"),where("Convo_Id", "in", [uid+usertarget.Target_uid, usertarget.Target_uid+uid]),orderBy("created"));
    const Unsubscribe = onSnapshot(que, (querySnapshot)=>{
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})
      })
      setMessages(messages)
    })
    return () => Unsubscribe

  },[])

  const [TxtMessage, setTxtMessage] = useState('');
  const sendMessage = async(e) => {
    e.preventDefault()
    if (TxtMessage === '') {
      alert('Please Enter Message in the Text Field')
      return;
    } 
    console.log("Before: "+(messages.map(message => message.selected)));
    delete messages.selected;

    const updatedMessages = messages.map(obj => {
      const { selected, ...rest } = obj;
      return rest;
    });
    setMessages(updatedMessages);
    
    if(messages.length == 0){
      const { uid, photoURL,displayName } = auth.currentUser
      await addDoc(collection(db, 'messages'), {
       Convo_Id: uid+usertarget.Target_uid,
       Text: TxtMessage,
       Name: displayName,
       created: serverTimestamp(),
       uid,
       photoURL,
       P1_Name: displayName,
       P1_ID: uid,
       P1_PhotoURL:photoURL,
       P2_Name: usertarget.Target_Name,
       P2_ID: usertarget.Target_uid,
       P2_PhotoURL:usertarget.Target_photoURL
     });
     setTxtMessage('')
    return;
    }
    if(messages.length != 0){
    const { uid, photoURL,displayName } = auth.currentUser
    await addDoc(collection(db, 'messages'), {
     Convo_Id: messages[0].Convo_Id,
     Text: TxtMessage,
     Name: displayName,
     created: serverTimestamp(),
     uid,
     photoURL,
     P1_Name: displayName,
     P1_ID: uid,
     P1_PhotoURL:photoURL,
     P2_Name: usertarget.Target_Name,
     P2_ID: usertarget.Target_uid,
     P2_PhotoURL:usertarget.Target_photoURL
   });
   console.log("After: "+(messages.map(message => message.selected)));
setTxtMessage('')
{if (bottomRef.current) {bottomRef.current.scrollIntoView({ behavior: 'smooth' });}}
return;
  }
  console.log('Message Error')
  }

  return (<>
    <main>

      {messages && messages.map((message,index) => 
      <>
      <div>{message.selected ? <><div ref={autoscroll} id="bottom"/></>: null}</div>
      <ChatMessage key={message.id} message = {message} setMessages={setMessages} index={index}/>
      </>)}

      <div ref={bottomRef} id="bottom"/>
      {messages.every((message) => !message.selected)?<div ref={autoscroll} id="bottom"/>:null}
      

    </main>
    <form ref={bottomRef} onSubmit={sendMessage}>

      <input value={TxtMessage} onChange={(e) => setTxtMessage(e.target.value)} placeholder="Enter Message" />

      <button className='bg-orange-600' type="submit">Send</button>

    </form>
  </>)
}

function ChatMessage({message, setMessages,}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [unsent, SetUnsent] = useState(false);
  async function UnsentMessage(message){
    console.log(message)
    const collectionRef = collection(db, "messages");
    const queryRef = query(collectionRef, where("__name__", "==", message.id));
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        Text: deleteField()
      });
    });
  }
   const messageClass = 
  message.uid == auth.currentUser.uid
  ? `sent`
  : `received`
  // eslint-disable-next-line
  const MessageClick = (message) => {
    if (selectedItem === message) {
      // if the clicked item is already selected, deselect it
      setSelectedItem(null);
    } else {
      // otherwise, select the clicked item and unselect any previously selected message
      setSelectedItem(message);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg === message ? { ...msg, selected: true } : { ...msg, selected: false }
        )
      );
    }
  };
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
  return (<div >
    
    <div className={`message ${messageClass} mt-5`} onClick={() => message.uid == auth.currentUser.uid? MessageClick(message):null}>
    {message.Text?
    <>
      <img src={message.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/>
      <p>
        <n><i>{message.Name}</i></n><br/>{message.Text}<br/><t><i>{ getdatetime(message.created)}</i></t><br/>
        {message.selected ?
          unsent ?
          <div>
            <button  onClick={() => UnsentMessage(message, index)} className='text-sm w-[70px] ml-[5px] shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-1 rounded'>
              <i>Confirm</i>
            </button>
            <button onClick={() => SetUnsent(false)} className='text-sm w-[70px] ml-[5px] shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-1 rounded'>
              <i>Cancel</i>
            </button>
          </div>
          :
          <div>
            <button onClick={() => SetUnsent(true)} className='text-sm w-[70px] ml-[5px] shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-1 rounded'>
              <i>Unsent</i>
            </button>
          </div>
        : null
        }
      </p>
    </>
    :
    <>
<img src={message.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='Failed to Load'/>
      <p>
        <n><i>{message.Name+" Unsent a message"}</i></n>
      </p>
    </>}

  </div>
  
  </div>)
}


export default Chatroom;
