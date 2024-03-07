import React, { useState } from 'react';
import { LoginAPI } from '../api/AuthAPI';
import "../Sass/LoginComponent.scss";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import LinkedinLogo from '../assets/linkedinLogo.png';

function LoginComponent() {
  let navigate=useNavigate();
  const [credentials,setCredentials]= useState({});
  const login = async()=>{
    try{
      let res = await LoginAPI(credentials.email,credentials.password);
      toast.success("Signed in");
      navigate("/home");
      console.log(res.user);
      localStorage.setItem("userEmail", res.user.email);
    }
    catch(err){
      console.log(err);
      toast.error("Wrong username or password");
    }
  };
  return (
    <div className='login-wrapper'>
      <img src={LinkedinLogo} className='linkedinlogo'/>
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent