// Importing React Packages
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Importing local files
import Home from "./screens/Home"
import Login from "./screens/Login"
import Signup from "./screens/Signup"


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createUser" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App