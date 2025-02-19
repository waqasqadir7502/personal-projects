import React, { useState } from "react";
import "../stylesheet/auth.css" 
import axios from 'axios' 
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

function Auth() {
    return (
    <div className="auth">
      <Signup/>
      <Login/>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-right overlay-panel">
          <h1>Welcome Back!</h1>
            <p>
                To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn">Sign In</button>
          </div>   
          <div className="overlay-left overlay-panel">
          <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

//Login functionality
const Login = ({toggleForm}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies]= useCookies(["access_token"])
  const navigate = useNavigate();

 const onSubmit = async (event)=>{
    event.preventDefault();
    try{
        const response = await axios.post('http://localhost:3001/auth/signin',{
            username , password
        });
        setCookies("access_token" , response.data.token);
        window.localStorage.setItem("userID", response.data.UserID)
        navigate("/")
    }catch(err){
        console.error(err)
    }
 }
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Log In"
      onSubmit={onSubmit}
    />
  );
};

//Sign up functionality
const Signup = ({toggleForm}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

const onSubmit = async (event)=>{
    event.preventDefault();

    try{
        await axios.post('http://localhost:3001/auth/signup',{
            username , password
        });
        alert("Registration Complete! Please Proceed to Log In")
    }catch(err){
        console.error(err)
    }
};
  return (
    <Form
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      label="Sign Up"
      onSubmit={onSubmit}
    />
  );
};


// Form Structure
const Form = ({ username, setUsername, email, setEmail, password, setPassword, label ,onSubmit}) => {
  return (
    <>
    <div>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="formgroup">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(ev) => {
              setUsername(ev.target.value);
            }}
          />
        </div>
        {label === "Sign Up" && <div className="formgroup">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
          />
        </div>} 
        <div className="formgroup">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
     
      </>
  );
};

export default Auth;
