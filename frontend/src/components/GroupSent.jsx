import React, { useState } from 'react'
import { useAddGroupMsgMutation } from '../features/user/messageQuery';
import { useSelector } from 'react-redux';
import { socket } from '../socket';

export const GroupSent = ({to,from,msgList,setMsgList}) => {

  const {userInfo} = useSelector((state)=>state.auth);

  const [addGroupMsg,{isLoading}] = useAddGroupMsgMutation();

  const [text,setText] = useState('');

  const handleSendMsg = async(e)=>{
   e.preventDefault();
   if(!text) return;
 
  console.log(text);
  addGroupMsg({to,from,text}).unwrap().then(res=>{

    socket.emit('send-groupMessage',{
      from,
      to,
      fromName:userInfo.username,
      text
    }); 
   });

    const msgs = [...msgList];
   msgs.push({
     from,
     to,
     text
   });
   setMsgList(msgs) 
  setText('');
  }
  return (
    <form className='msg_input--container' onSubmit={handleSendMsg} >
        <input 
         onChange={(e)=>setText(e.target.value)}
         value={text}
         type="text" 
         placeholder='snet a message'
         className='text_glow--white'
        />
        <button >{isLoading?"Loading...":"sent"}</button>
       </form> 
  )
}
