import React, { useEffect, useRef, useState } from 'react'
import { Message } from './Message';
import { useGetAllGroupMsgMutation, useGetAllMsgMutation } from '../features/user/messageQuery';
import { useSelector } from 'react-redux';
import { InboxSent } from './InboxSent';
import { GroupSent } from './GroupSent';
import { socket } from '../socket';
import useToggleBtn from '../hooks/UseToggleBtn';
const avatar = "https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg";

// const profilePic = "https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg";

export const ChatContainer = ({selectedUser,selectedGroup, setUser, setGroup}) => {

  // console.log('selected user ',selectedUser);
  const {userInfo} = useSelector((state)=>state.auth);

  const [getAllMsg,{isLoading}] = useGetAllMsgMutation();
  const [getAllGroupMsg,{isLoading:isGMLoading}] = useGetAllGroupMsgMutation();
  const [msgList,setMsgList] = useState([]);
  const [recivedMsg,setRecivedMsg] = useState(null);
  const divUndRef = useRef();

  const {toggleOn,toggleOff} = useToggleBtn('#chatContainer');
  const {toggleOn:showLeftbar,toggleOff:hideLeftbar} = useToggleBtn('#leftBar');

   const handleGetAllMessage = async(type)=>{
    if(!selectedUser?._id && !selectedGroup?._id) return;

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
    socket.emit('joinGroup', { groupId: selectedGroup?._id, userId: userInfo?._id });
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
    if(selectedUser?._id){
      setGroup(null);
      handleGetAllMessage('inbox');
    }
    /* if(selectedUser){
      handleGetAllMessage('inbox');
    } */
  },[selectedUser]);

  useEffect(()=>{
   // if(selectedGroup){
      /* const data = handleGetAllMessage('group');
      //console.log('get msg', data);
      data.then((res)=>{
      console.log('res',res);
      setAllMsgs(res);
      socket.emit('joinGroup', { groupId: selectedGroup?._id, userId: selectedUser?._id });
    }); */

    /*  if(selectedGroup){
      handleGetAllMessage('group');
      console.log('group msg',msgList);
    } */
     if(selectedGroup?._id){
      setUser(null);
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
     
    }
  },[recivedMsg]);

  return (
    <div id='chatContainer'>
    { (!selectedUser?._id && !selectedGroup?._id)&& <span className='placeholder'>select a chat to see messages</span>}
    
    {selectedUser?._id && 
      <div className='user_chat--container'>
        <div className='header'>
          <button className='back_btn' onClick={()=>{toggleOff(); showLeftbar();}} >←</button>
          <img src={selectedUser?.profilePic || avatar} className="porfile_pic" />  
          <div className='user_info'>
            <p className='username text_glow--white'>{selectedUser?.username}</p>
            <span className='status text_glow--white'>online</span>
          </div>
        </div> 
          <div className="chat_box">
               {
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

      {selectedGroup?._id && <div className='user_chat--container'>
        <div className='header'>
        <button className='back_btn' onClick={()=>{toggleOff(); showLeftbar();}} >←</button>
          <img src={avatar} className="porfile_pic" />  
          <div className='user_info'>
            <p className='username text_glow--white'>{selectedGroup?.name}</p>
            <span className='status text_glow--white'>memebers:{selectedGroup?.members?.length}</span>
          </div>
        </div> 
          <div className="chat_box">
              {
              msgList?.map((msg,index)=>(
                <Message
                 key={index}
                 username={msg?.fromName || msg?.from}
                 fromSender={msg?.from==userInfo._id}
                 text={msg?.text} />
              ))
             }
             <div ref={divUndRef}></div>
          </div>
        <GroupSent 
              to={selectedGroup._id} 
              from={userInfo._id}
              setMsgList={setMsgList}
              msgList={msgList}
         />
      </div>}

      
    </div>
  )
}
