import { useState } from 'react'
import { LeftBar } from '../components/LeftBar'
import { ChatContainer } from '../components/ChatContainer'

export const Home = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);

  return (
    <div id='home'>
      <LeftBar setSelectedUser={setSelectedUser} setSelectedGroup={setSelectedGroup} />
      <ChatContainer selectedUser={selectedUser} selectedGroup={selectedGroup} />
    </div>
  )
}
