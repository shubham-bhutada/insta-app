import React,{useState} from 'react'
import axios from 'axios'


const Dashboard = ({token}) => {
    const [joke, setJoke] = useState('');

    async function getJoke() {
        try{
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            setJoke(response.data.data.message)
        } catch(error) {
            console.log(error.response.data.message);
        }
    }

  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={getJoke}>Get Joke</button>
        {
            joke && <h2>{joke}</h2>
        }
    </div>
  )
}

export default Dashboard