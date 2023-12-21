import React, { useState } from "react";
import axios from "axios";

const Signup = ({setToken}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  function userUpdate(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(!user.name || !user.email || !user.password || !user.confirmPassword) {
        setMessage("Please fill all the input fields")
        return;
    }
    if(user.password !== user.confirmPassword) {
        setMessage("Password and confirm password are not matching")
        return;
    }
    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/signup",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );
      console.log(response.data.message);
      setMessage(response.data.message);
      setUser({name: "",email: "", password: "", confirmPassword: ""})
      setToken(response.data.data.token)
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={userUpdate}
          value={user.name}
        />
        <br />
        <br />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={userUpdate}
          value={user.confirmPassword}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <h2>{message}</h2>}
    </div>
  );
};

export default Signup;
