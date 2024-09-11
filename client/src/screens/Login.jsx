// IMporting React Icons
import { ImSpinner9 } from "react-icons/im";

// Importing React Packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

// Importing local files
import Navbar from '../components/Navbar';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({email:"", password:""})
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    //Synthetic event
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_LOCATION}/api/loginUser`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credentials.email, password:credentials.password})
      });
      
      const json = await response.json()
  
      if(!json.success){
        alert("Enter Valid Credentials")
      }
      
      if(json.success){
        localStorage.setItem("userName", json.name);
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onChangeValue = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  
  return (
    <div className="h-lvh bg-gray-950 text-white font-mono">
      <Navbar />

      <form onSubmit={handleSubmit} className="text-2xl px-20 py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" value={credentials.email} onChange={onChangeValue} className="bg-transparent px-5 py-2 border-2 border-gray-700 rounded-lg outline-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Email password</label>
          <input type="password" name="password" value={credentials.password} onChange={onChangeValue} className="bg-transparent px-5 py-2 border-2 border-gray-700 rounded-lg outline-none" />
        </div>

        <div className="flex items-center gap-5">
          {loading 
            ?<p className="text-blue-500 flex flex-col items-center gap-2">
              <ImSpinner9 className="size-10 animate-spin" />
              <span>Processing...</span>
            </p>
            :<button type="submit" className="bg-blue-400 w-fit px-5 py-1 rounded-lg">Submit</button>
          }
          <Link to="/createUser" className="bg-red-400 w-fit px-5 py-1 rounded-lg">New User?</Link>
        </div>
        {error && <span className="text-3xl text-red-600">{error}</span>}
      </form>
    </div>

  )
}