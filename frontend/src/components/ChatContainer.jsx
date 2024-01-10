import React from 'react'
import { Message } from './Message';

export const ChatContainer = () => {
  const slelectedUser = true;
  return (
    <div id='chatContainer'>
    { !slelectedUser && <span className='placeholder'>select a chat to see messages</span>}
    
    {slelectedUser && 
      <div className='user_chat--container'>
        <div className='header'>
          <img src="https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg" className="porfile_pic" />  
          <div className='user_info'>
            <p className='username text_glow--white'>username</p>
            <span className='status text_glow--white'>online</span>
          </div>
        </div> 
          <div className="chat_box">
             <Message username={'username'} text={"this is a user text"} />
             
             <Message username={'username'} text={"tLorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate, dolores quibusdam ullam perferendis veniam neque quas, tempora, ipsa deserunt ratione rem omnis adipisci praesentium quia. Perspiciatis, dolorem delectus? Voluptatum!t"} />

            <Message username={'guest'} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veritatis."} />

            <Message username={'you'} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate, dolores quibusdam ullam perferendis veniam neque quas, tempora, ipsa deserunt ratione."} />

          </div>
         <form className='msg_input--container'>
        <input type="text" placeholder='snet a message' className='text_glow--white'/>
        <button>snet</button>
       </form> 
      </div>}

      
    </div>
  )
}
