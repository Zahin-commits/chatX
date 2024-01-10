import React from 'react'
import { LeftBar } from '../components/LeftBar'
import { ChatContainer } from '../components/ChatContainer'

export const Home = () => {
  return (
    <div id='home'>
      <LeftBar/>
      <ChatContainer/>
    </div>
  )
}
