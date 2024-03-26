import React, { useState } from 'react'
import { useAddDmMsgMutation } from '../features/user/messageQuery';

export const InboxSent = ({to,from}) => {

  const [addDmMsg,{isLoading}] = useAddDmMsgMutation();

  const [text,setText] = useState('');

  const handleSendMsg = async(e)=>{
   e.preventDefault();
   if(!text) return;
 
  console.log(text);
  const res = addDmMsg({to,from,text}).unwrap();
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
