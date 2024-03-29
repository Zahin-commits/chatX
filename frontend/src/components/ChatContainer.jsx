import React, { useEffect, useRef, useState } from 'react'
import { Message } from './Message';
import { useGetAllGroupMsgMutation, useGetAllMsgMutation } from '../features/user/messageQuery';
import { useSelector } from 'react-redux';
import { InboxSent } from './InboxSent';
import { socket } from '../socket';
const avatar = "https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg";

// const profilePic = "https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg";

export const ChatContainer = ({selectedUser,selectedGroup}) => {

  // console.log('selected user ',selectedUser);
  const {userInfo} = useSelector((state)=>state.auth);

  const [getAllMsg,{isLoading}] = useGetAllMsgMutation();
  const [getAllGroupMsg,{isLoading:isGMLoading}] = useGetAllGroupMsgMutation();
  const [msgList,setMsgList] = useState([]);
  const [recivedMsg,setRecivedMsg] = useState(null);
  const divUndRef = useRef();

   const handleGetAllMessage = async(type)=>{
    if(!selectedUser._id && !selectedGroup._id) return;

     if(type=="inbox"){
     const res = await getAllMsg({
       from:userInfo._id,
       to:selectedUser._id
     }).unwrap();
    //  if(res) return res;
    setMsgList(res);
      console.log('handle all msg data',res);
   }else if(type=='group'){
     const res = await getAllGroupMsg({
       groupId:selectedGroup?._id
     }).unwrap();
    //  if (res) return res;
    setMsgList(res);
   }
  };

  useEffect(()=>{
    const div = divUndRef.current;
    if(div){
      div.scrollIntoView({behavior:'smooth',block:'end'})
    }
  },[msgList]);

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

  useEffect(()=>{
    if(selectedGroup){
      handleGetAllMessage('group');
      console.log('group msg',msgList);
    }
  },[selectedGroup])

  useEffect(()=>{
    /* socket.on('message-recived',(data)=>{
      console.log(data);
      setRecivedMsg(data);
    }) */
    socket.on('msg-recived',(data)=>{
      console.log(data);
      setRecivedMsg(data);
    })

    socket.on('recived-groupMessage',(data)=>{
      console.log(data);
      setRecivedMsg(data);
    })
  },[socket]);

  useEffect(()=>{
    if(recivedMsg){
       setMsgList((prev) => [...prev, recivedMsg]);
      /*  const newMsgroup = allMsgs.push(recivedMsg);
       setAllMsgs(newMsgroup); */
    }
  },[recivedMsg]);

  return (
    <div id='chatContainer'>
    { (!selectedUser._id && !selectedGroup._id)&& <span className='placeholder'>select a chat to see messages</span>}
    
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
              msgList?.map((msg,index)=>(
                <Message
                 key={index}
                 username={selectedUser?.username}
                 fromSender={msg?.from==userInfo._id}
                 text={msg?.text} />
              ))
             }
             <div ref={divUndRef}></div>
          </div>
        <InboxSent 
              to={selectedUser._id} 
              from={userInfo._id}
              setMsgList={setMsgList}
              msgList={msgList}
         />
      </div>}

      {selectedGroup && <div className='user_chat--container'>
        <div className='header'>
          <img src={avatar} className="porfile_pic" />  
          <div className='user_info'>
            <p className='username text_glow--white'>{selectedGroup?.name}</p>
            <span className='status text_glow--white'>memebers:{selectedGroup.members.length}</span>
          </div>
        </div> 
          <div className="chat_box">
          {/*    <Message username={selectedUser?.username} text={"this is a user text"} />
             
             <Message username={selectedUser?.username} text={"tLorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate, dolores quibusdam ullam perferendis veniam neque quas, tempora, ipsa deserunt ratione rem omnis adipisci praesentium quia. Perspiciatis, dolorem delectus? Voluptatum!t"} />

            <Message username={selectedUser?.username} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, veritatis."} />

            <Message username={'you'} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos cupiditate, dolores quibusdam ullam perferendis veniam neque quas, tempora, ipsa deserunt ratione."} />
      */}        {
              msgList?.map((msg,index)=>(
                <Message
                 key={index}
                 username={msg?.from}
                 fromSender={msg?.from==userInfo._id}
                 text={msg?.text} />
              ))
             }
             <div ref={divUndRef}></div>
          </div>
        {/* <InboxSent 
              to={selectedUser._id} 
              from={userInfo._id}
              setMsgList={setMsgList}
              msgList={msgList}
         /> */}
      </div>}

      
    </div>
  )
}
