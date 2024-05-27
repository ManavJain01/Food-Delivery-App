// Importing React Packages
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// Importing local files
import Home from "./screens/Home"


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App