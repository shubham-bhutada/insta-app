import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const {setToken} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token") != undefined) {
      navigate("/dashboard")
    }
  },[])

  function userUpdate(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    if(!user.email || !user.password) {
        setMessage("Please fill all the input fields");
        return;
    }
    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      console.log(response.data.message);
      setMessage(response.data.message);
      setToken(response.data.data.token)
      localStorage.setItem("token", JSON.stringify(response.data.data.token))
      setUser({email: "", password: ""})
      alert("Login successful")
      navigate("/dashboard")
      // console.log(response.data.data.token);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={userUpdate}
          value={user.email}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={userUpdate}
          value={user.password}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <h2>{message}</h2>}
    </div>
  );
};

export default Login;
