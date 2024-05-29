// Importing React Packages
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Importing local files
import Home from "./screens/Home"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Cart from "./screens/Cart"
import MyOrders from "./screens/MyOrders"
import { CartProvider } from "./components/ContextReducer"


function App(){
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createUser" element={<Signup />} />
          <Route exact path="/myCart" element={<Cart />} />
          <Route exact path="/myOrders" element={<MyOrders />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App