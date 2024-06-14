import React, { useState, useEffect } from 'react'
import UserMessage from '../../../components/Groups/UserMessage'
import SendIcon from '@mui/icons-material/Send';
import ScrollableFeed from 'react-scrollable-feed'
import OtherUserChat from "../../../components/Groups/OtherUserChat";
import io from "socket.io-client"
const Chats = () => {
  const buttonStyle = {
    "fontSize": 30,
  }
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const ENDPOINT = "http://localhost:3000";
  var socket = io(ENDPOINT);
  useEffect(() => {
    const data = {
      "_id" : localStorage.getItem("grpId")
    }
    socket.emit("join chat", data);
    console.log("Joined socket of the group");
    console.log(socket);
  }, []);
  useEffect(() => {
    async function main() {
      const response = await fetch("http://localhost:3000/getMessages", {
        method : "POST",
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({
          grpId : localStorage.getItem("grpId")
        })
      });
      const data = await response.json();
      setChats(data);
    }
    main();
    
  }, [chats.length]);
  
  function convertToString(time){
    let to_return = "";
    const lastDigit = time%10;
    time = Math.floor(time/10);
    to_return += time;
    to_return += lastDigit;
    return to_return;
  }
  async function handleClick () {
    if(message.length != 0){
      const response = await fetch("http://localhost:3000/setMessages", {
        method : "POST",
        headers : {
          'Content-Type' : "application/json",
        },
        body : JSON.stringify({
          grpId : localStorage.getItem("grpId"),
          userId : localStorage.getItem("_id"),
          content : message
        })
      });
      const data = await response.json();
      socket.emit("new message", data);
      document.getElementById("chat-holder").value = "";
      setMessage("");
    }
  }
  function handleInput (e) {
    const data = e.target.value;
    setMessage(data);
  }
  function CustomMessage({data}){
    if(data.senderId == localStorage.getItem("_id")){
      return <UserMessage sender = {data.username} content = {data.content} hr_sent = {convertToString(data.hr_sent)} min_sent = {convertToString(data.min_sent)}/>
    }
    else{
      return <OtherUserChat sender = {data.username} content = {data.content} hr_sent = {convertToString(data.hr_sent)} min_sent = {convertToString(data.min_sent)}/>
    }
  }
  useEffect(() => {
    console.log(socket);
    socket.on("message received", (newMessageReceived) => {
      setChats([...chats, newMessageReceived]);
    })
  })
  return (
    <>
    <div className = "mt-4">
      <ScrollableFeed> 
        {chats.map((msg) => {
          return <CustomMessage key = {msg._id} data = {msg} />
        })}
      </ScrollableFeed> 
       <div className='absolute bottom-[60px] left-0'>
           <input id = "chat-holder" className = "ml-[20px] p-2 w-[1350px] outline-0 border-2 border-zinc-200 rounded-lg" placeholder = "Message..." onChange = {handleInput} ></input>
           <button className='pl-4 pb-4' onClick = {handleClick}>
             <SendIcon style = {buttonStyle}/>
           </button>
       </div>
     </div>
    </>
  )
}

export default Chats