import {useState, useEffect, useRef } from 'react';

const ASCII_OF_A = 'a'.charCodeAt();
const NO_OF_ALPHABETS = 26;


function getRandomLetter() {
  return String.fromCharCode(Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A);
}

function animateElement(element, originalText, options) {
  let iteration = 0;

  if (options.interval) {
    return;
  }

  options.interval = setInterval(() => {
    const newWord = originalText
      .split('')
      .map((_, idx) => {
        if (idx < iteration) {
          return originalText[idx];
        }
        return getRandomLetter();
      })
      .join('');
    element.innerText = newWord;

    iteration += 1;

    if (iteration > originalText.length) {
      clearInterval(options.interval);
      options.interval = null;
    }
  }, 20); //it used to be 30mm
}

export const Message = ({username,text,fromSender}) => {
// const user = "you";

const animateTextRef = useRef();

useEffect(() => {
  const element = animateTextRef.current;
  const originalText = element.innerText;
  const options = {
    interval: null,
  };

  animateElement(element,originalText,options);
  return () => {
    clearInterval(options.interval);
  };
}, [text]);    
  return (
       <div className={'message '+(fromSender?'self':'')}>
            <h3 className={fromSender?'text_glow--green':'text_glow--yellow'} 
            >{fromSender?"You":username}</h3>

            <p className={'text_glow--white'}  ref={animateTextRef} >{text}</p>
        </div>
  )
}
