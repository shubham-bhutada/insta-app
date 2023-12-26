import React,{useState,useContext, useEffect} from 'react'
import axios from 'axios'
import UserContext from "../Context/UserContext"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [joke, setJoke] = useState('');
    const {token,setToken} = useContext(UserContext)
    const [name, setName] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        if(token) {
            getJoke();
        }
    },[token]);

    useEffect(()=> {
        if(token == "") {
            if(localStorage.getItem("token")==undefined) {
                navigate("/login")
            } else {
                setToken(JSON.parse(localStorage.getItem("token")))
            }
        }
    },[token])


    async function getJoke() {
        try{
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            setJoke(response.data.data.message)
            setName(response.data.data.user.name)
        } catch(error) {
            console.log(error.response.data.message);
        }
    }

    async function logout() {
        try{
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers:{
                    "authorization" : `Bearer ${token}`
                }
            })
            alert("Logout successful")
            localStorage.removeItem('token')
            setToken('')
            setName('')
            setJoke('')
        } catch(err){
            console.log(err.response.data.message);
        } 
    }

  return (
    <div>
        <h1>Welcome {name}</h1>
        {
            <p>{joke}</p>
        }
        <button onClick={logout}>logout</button>
    </div>
  )
}

export default Dashboard