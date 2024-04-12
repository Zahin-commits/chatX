import { useState } from "react";

const useToggleBtn = (params)=>{
 /*    
    const toggleActive =(isActive)=>{
        const content = document.querySelector(params);

        // content.classList.toggle("active");
        if(isActive){
            content.classList.add("active");
        }else{
            content.classList.remove("active");
        }
     };

    return {toggleActive} */

    const toggleOn =()=>{
        const content = document.querySelector(params);

        content.classList.add("active");
        console.log(params, 'active')
     };

    const toggleOff =()=>{
        const content = document.querySelector(params);
       
        content.classList.remove("active");
        console.log(params, 'inactive') 
    };

    return {toggleOn,toggleOff}
}

export default useToggleBtn;