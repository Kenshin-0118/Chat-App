import { auth,db } from './firebase'
import React, { useRef, useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from "react-google-button"
import firebase from 'firebase/app';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDoc, getDocs} from 'firebase/firestore'
import Users from './Users'
import ChatList from './Chat_list'
import GroupList from './Group_Chat_List'



function Join({setMenu}) {
    const [Code, setCode] = useState('')
    const [myArray, setMyArray] = useState([]);
    function Cancel(event) {
      setMenu('Groups')
    }

    useEffect(() => {
      const fetchData = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, 'groups'));
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setMyArray(data);
      };
      fetchData();
    }, []);

async function JoinGroup() {
  console.log(myArray)
  const { uid } = auth.currentUser
  if (myArray.some(item => item.Group_ID === Code)) {
    const filteredGroup = myArray.filter(item => item.Group_ID === Code);
      if ((filteredGroup.some(item => item.uid === uid))){
        alert('User already Exist!');
      }
      else{
        const { uid,photoURL, displayName } = auth.currentUser
        addDoc(collection(db, 'groups'), {
          Group_Name: filteredGroup[0].Group_Name,
          Name: displayName,
          created: serverTimestamp(),
          photoURL,
          uid,
          Group_ID: Code
      });
      alert('User added to the group');
      setMenu('Groups')
      }
  } else {
    alert('Group does not Exist!');
  }
  /*const que = query(collection(db,"groups"),where('Group_ID', '==', Code));
  const querySnapshot = await getDocs(que);
  const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (documents.length != 0) {
    // The group exists, check if the user is already a member
    const { uid } = auth.currentUser
    const members = documents.uid;

    console.log('uids:'+members)
    if (members.includes(uid)) {
      // The user is already a member, do nothing
      console.log('User is already a member of this group');
    } else {
      const { uid,photoURL, displayName } = auth.currentUser
        addDoc(collection(db, 'groups'), {
          Group_Name: Group.Name,
          Name: displayName,
          created: serverTimestamp(),
          photoURL,
          uid,
          Group_ID: Code
      });
      alert('User added to the group');
    }
  } else {
    alert('Group does not exist');
  }*/
}

  return (
          <div className="text-xl flex justify-center flex-col items-center h-full w-full">
            <div className="text-2xl font-bold flex justify-center flex-col items-center text-gray-500">Enter Group Code to<br/>Join Existing Chat Group</div><br/>
              <input className=" w-[450px] shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="code" placeholder="Group Code" onChange={(e) => setCode(e.target.value)} id="username" type="text"/>
              <button onClick={JoinGroup}className=" w-[200px] mt-3 shadow bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold rounded flex justify-center" type="button">
                  Join Group
              </button>
              <button onClick={Cancel} className=" w-[200px] mt-3 shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold rounded flex justify-center" type="button">
                  Cancel
              </button>
          </div>
  );
}

export default Join;
