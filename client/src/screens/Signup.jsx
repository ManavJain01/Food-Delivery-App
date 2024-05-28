// Importing React Packages
import { useState } from 'react';
import { Link } from 'react-router-dom'

// Importing Local Files
import Navbar from '../components/Navbar'

export default function Signup(){
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", geolocation:""})

  const handleSubmit = async (e) => {
    //Synthetic event
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createUser", {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
    });
    
    const json = await response.json()
    console.log(json);

    if(!json.success){
      alert("Enter Valid Credentials")
    }
  }

  const onChangeValue = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div className="h-lvh bg-gray-950 text-white">
      <Navbar />

      <form onSubmit={handleSubmit} className="text-2xl px-20 py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Enter your name</label>
          <input type="text" name="name" value={credentials.name} onChange={onChangeValue} className="bg-transparent px-5 py-2 border-2 border-gray-700 rounded-lg outline-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" value={credentials.email} onChange={onChangeValue} className="bg-transparent px-5 py-2 border-2 border-gray-700 rounded-lg outline-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Email password</label>
          <input type="text" name="password" value={credentials.password} onChange={onChangeValue} className="bg-transparent px-5 py-2 border-2 border-gray-700 rounded-lg outline-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="geolocation">Enter Your Address</label>
          <input type="text" name="geolocation" value={credentials.geolocation} onChange={onChangeValue} className="bg-transparent px-5 py-2 border-2 border-gray-700 rounded-lg outline-none" />
        </div>

        <div className="flex gap-5">
          <button type="submit" className="bg-blue-400 w-fit px-5 py-1 rounded-lg">Submit</button>
          <Link to="/login" className="bg-red-400 w-fit px-5 py-1 rounded-lg">Already a User</Link>
        </div>
      </form>
    </div>
  )
}