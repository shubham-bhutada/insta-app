import React, { useState } from "react";
import axios from "axios";

const Login = ({setToken}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function userUpdate(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    if(!user.email || !user.password) {
        setMessage("Please fill all the input fields");
        return;
    }
    console.log("hi");
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
      setUser({email: "", password: ""})
      setToken(response.data.data.token)
      console.log(response.data.data.token);
      console.log("hi in try");
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
      console.log("hi in catch");
    }
    console.log("hello");
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
