import React, { useEffect, useState } from 'react'
import { Message } from './Message';
import { useGetAllMsgMutation } from '../features/user/messageQuery';
import { useSelector } from 'react-redux';
import { InboxSent } from './InboxSent';
const avatar = "https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg";

// const profilePic = "https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg";

export const ChatContainer = ({selectedUser,slelectedGroup}) => {

  // console.log('selected user ',selectedUser);
  const {userInfo} = useSelector((state)=>state.auth);

  const [getAllMsg,{isLoading}] = useGetAllMsgMutation();
  const [msgList,setMsgList] = useState([]);

   const handleGetAllMessage = async(type)=>{
    if(!selectedUser._id) return;

     if(type=="inbox"){
     const res = await getAllMsg({
       from:userInfo._id,
       to:selectedUser._id
     }).unwrap();
    //  if(res) return res;
    setMsgList(res);
      console.log('handle all msg data',res);
   }else if(type=='group'){
     const res = await getAllMsg({
       groupId:'selectedGroup?._id'
     }).unwrap();
    //  if (res) return res;
    setMsgList(res);
   }
  };

  useEffect(()=>{
  /*   if(selectedUser){
      setSelectedGroup(null);
      const data = handleGetAllMessage('inbox');
      //console.log('get msg', data);
      data.then((res)=>{
      console.log('res',res);
      setAllMsgs(res);
    });
    } */
    handleGetAllMessage('inbox');
  },[selectedUser]);

  return (
    <div id='chatContainer'>
    { !selectedUser._id && <span className='placeholder'>select a chat to see messages</span>}
    
    {selectedUser._id && 
      <div className='user_chat--container'>
        <div className='header'>
          <img src={selectedUser?.profilePic || avatar} className="porfile_pic" />  
          <div className='user_info'>
            <p className='username text_glow--white'>{selectedUser?.username}</p>
            <span className='status text_glow--white'>online</span>
          </div>
        </div> 
          <div className="chat_box">
          {/*    <Message username={selectedUser?.username} text={"this is a user text"} />
             
             <Message username={selectedUser?.username} text={"tLorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate, dolores quibusdam ullam perferendis veniam neque quas, tempora, ipsa deserunt ratione rem omnis adipisci praesentium quia. Perspiciatis, dolorem delectus? Voluptatum!t"} />

            <Message username={selectedUser?.username} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veritatis."} />

            <Message username={'you'} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate, dolores quibusdam ullam perferendis veniam neque quas, tempora, ipsa deserunt ratione."} />
      */}        {
              msgList?.map((msg)=>(
                <Message
                 key={msg?._id}
                 username={selectedUser?.username}
                 fromSender={msg?.from==userInfo._id}
                 text={msg?.text} />
              ))
             }
          </div>
        <InboxSent to={selectedUser._id} from={userInfo._id} />
      </div>}

      
    </div>
  )
}
