import React, { useContext, useState } from "react";
import "./LoginPopUP.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

const LoginPopUP = ({ setShowLogin }) => {

  const {url,token,setToken}=useContext(StoreContext)
  
  const [curState, setCurState] = useState("Login");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler=(event)=>{

    const name=event.target.name
    const value =event.target.value
    setData(data=>({...data,[name]:value}))

  }

  const onLogin=async(event)=>{
    event.preventDefault()
    let newUrl=url;
    if(curState==="Login"){
      newUrl+="/api/user/login"
    }
    else{
      newUrl+="/api/user/register"
    }

    const response =await axios.post(newUrl,data);
    if(response.status===200){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message )
      console.log("error")
    }


  }

 

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {curState === "Login" ? (
            <></>
          ) : (
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your Name" required />
          )}

          <input name="email" onChange={onChangeHandler} value={data.email}  type="email" placeholder="Your Email" required />
          <input name="password" onChange={onChangeHandler} value={data.password}  type="password" placeholder="Your Password" required />
        </div>
        <button type="submit">{curState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" />
            <p>By Continuing I agree Terms And COnditoins</p>
            </div> 
            {curState==="Login"?<p>Create A new Accout ? <span onClick={()=>setCurState("Sign Up")}>Click Here</span></p>:<p>Already Have An account? <span onClick={()=>setCurState("Login")}>Login Here</span></p>   }
             
            
     </form>
    </div>
  );
};

export default LoginPopUP;
