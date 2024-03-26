import { VscMail } from "react-icons/vsc";
import { VscLock } from "react-icons/vsc";
import { GiHarryPotterSkull } from "react-icons/gi";
import { IoIosAdd } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {useNavigate,Link} from "react-router-dom"
import avatar from "../assets/avatar.jpg"
import { setCredentials } from '../app/authSlice';
import { useLoginMutation} from "../features/user/userQuery";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {

 const navigate = useNavigate();
 const dispatch = useDispatch();

 const {userInfo} = useSelector(state=>state.auth);
 const [login,{isloading}] = useLoginMutation();

 useEffect(() => {
  if(userInfo){
    navigate('/');
   }
 },[navigate,userInfo])

 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');

 const [showPopup,setShowPopup] = useState(false);
 const [isPpAdded,setIsPpAdded] = useState(false);

 const [previewImg, setPreviewImg] = useState(avatar);
 const inputRef = useRef('');

 const closePreview =()=>{
  inputRef.current.value = ''
  setPreviewImg(avatar);
  setIsPpAdded(false);
 }

 const handleClick = ()=>{
  inputRef.current.click();
 }

 const previewHandler = ()=>{
  const preview = URL.createObjectURL(inputRef.current.files[0]);
 console.log(inputRef.current.files[0]);
  setPreviewImg(preview);
  setIsPpAdded(true);
 }

  const handleLogin =async(e)=>{
    e.preventDefault();
  try {
    const res = await login({
      email,
      password}).unwrap();
   
    console.log(res);
    dispatch(setCredentials({...res})); 

    if(res.sucess){
      navigate('/');
    }
  } catch (error) {
    //console.log(error?.data?.message || error.error)
    console.log(error);
   /*  if(error.data.includes('dup key')){
      alert('The username or email is already in use.');
    }else{
      alert('Something went wrong :(');
    } */
    alert('Something went wrong :(');
  } 
}
  return (
    <div id="register" className="login">
      <span className="skull">
        <GiHarryPotterSkull/>
      </span>
     
      <h1 className="text_glow--yellow" >Login</h1>
 
      <form onSubmit={e=>{handleLogin(e)}} >
        <div><VscMail/><input onChange={(e)=>setEmail(e.target.value)} className="text_glow--white" type="text" placeholder="Email"/></div>        
        <div><VscLock/><input onChange={(e)=>setPassword(e.target.value)} className="text_glow--white" type="text" placeholder="Password"/></div> 
        <button type="submit">{isloading?"Loading...":"Login"}</button>   
      </form>
      <span className="link">Don't have an account? <Link to={'/register'}>Register</Link></span>
      {showPopup && <div className="selectDp">
        <div className="pic_container">
          
          <div className="effect_container">
           {/*  <img className="base_img" src="https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg"/>
            <img className="effect_img" src="https://e0.pxfuel.com/wallpapers/116/367/desktop-wallpaper-money-heist-dahli-mask-led-pink-money-heist-dali-thumbnail.jpg"/> */}
            <img className="base_img" src={previewImg}/>
           {isPpAdded && <img className="effect_img" src={previewImg}/>}
            <input 
              ref={inputRef}
              hidden
              type="file" accept='image/*' 
              onChange={previewHandler}
            />
          </div>
            
            <div className="add_btn" onClick={handleClick} ><IoIosAdd/></div>
        </div>
        
        <h2 className="text_glow--white">Select Your <br /> Profle Pictore</h2>

        <div className="option_btns">
          <button className="btn_can" onClick={()=>{setShowPopup(false); closePreview();}}>cancel</button>
          <button className="btn_sel" onClick={()=>{navigate('/')}} >select</button>
        </div>
      </div>}
    </div>
  )
}
