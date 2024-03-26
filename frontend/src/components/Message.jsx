import React from 'react'

export const Message = ({username,text,fromSender}) => {
const user = "you";
  return (
       <div className={'message '+(fromSender?'self':'')}>
            <h3 className={fromSender?'text_glow--green':'text_glow--yellow'} >{fromSender?"You":username}</h3>
            <p className={'text_glow--white'}>{text}</p>
        </div>
  )
}
