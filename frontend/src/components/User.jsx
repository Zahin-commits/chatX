import React from 'react'
const avatar = "https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg";
export const User = ({user,setChat}) => {
  //console.log(user);
  return (
    <div className='user' onClick={()=>setChat(user)} >
      <img src={user?.profilePic || avatar} alt="dp" className='user_profile--pic' />
      <p className='username text_glow--yellow'>{user?.username || "loading"}</p>
    </div>
  )
}
