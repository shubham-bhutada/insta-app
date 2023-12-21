import React, {useState} from 'react'
import axios from 'axios'

const Signup = () => {
  const [user, setUser] = useState({name:"", email:"", password:"", confirmPassword:""})


  function userUpdate(e) {
    setUser({...user, [e.target.name]:e.target.value})
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try{
        const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {
            name:user.name,
            email:user.email,
            password:user.password
        })
        console.log(response.data.message);
    }
    catch(err) {
        console.log(err.response.data.message);
    }
  }

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' name='name' onChange={userUpdate}/>
            <br/>
            <br/>
            <input type='email' placeholder='Email' name='email' onChange={userUpdate}/>
            <br/>
            <br/>
            <input type='password' placeholder='Password' name='password' onChange={userUpdate}/>
            <br/>
            <br/>
            <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={userUpdate}/>
            <br/>
            <br/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Signup