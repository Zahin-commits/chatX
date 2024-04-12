import { useEffect, useState } from 'react'
import { LeftBar } from '../components/LeftBar'
import { ChatContainer } from '../components/ChatContainer'
import { useNavigate } from 'react-router-dom'
import {socket} from '../socket'

export const Home = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || ''; 
 
  useEffect(()=>{
    if(!localStorage.getItem('userInfo')){
       navigate('/');
    }else{
     socket.emit('add-user',userInfo._id);
     console.log('userinfo',userInfo)
    }
  },[])
  return (
    <div id='home'>
      <LeftBar setSelectedUser={setSelectedUser} setSelectedGroup={setSelectedGroup} />
      <ChatContainer 
        selectedUser={selectedUser} selectedGroup={selectedGroup} 
        setUser={setSelectedUser} setGroup={setSelectedGroup} 
      />
    </div>
  )
}
