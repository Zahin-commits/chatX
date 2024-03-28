import React, { useState } from 'react'
import { useAddDmMsgMutation } from '../features/user/messageQuery';
import { useSelector } from 'react-redux';
import { socket } from '../socket';

export const InboxSent = ({to,from,msgList,setMsgList}) => {

  const {userInfo} = useSelector((state)=>state.auth);

  const [addDmMsg,{isLoading}] = useAddDmMsgMutation();

  const [text,setText] = useState('');

  const handleSendMsg = async(e)=>{
   e.preventDefault();
   if(!text) return;
 
  console.log(text);
   addDmMsg({to,from,text}).unwrap().then(res=>{

    socket.emit('send-dm-message',{
      from,
      to,
      username:userInfo.username,
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
