import React from 'react'

export const Message = ({username,text}) => {
    const user = "you";

  return (
       <div className={'message '+(username==user?'self':'')}>
            <h3 className={username==user?'text_glow--green':'text_glow--yellow'} >{username==user?"You":username}</h3>
            <p className={'text_glow--white'}>{text}</p>
        </div>
  )
}
