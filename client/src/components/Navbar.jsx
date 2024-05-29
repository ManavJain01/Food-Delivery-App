// Importing React Packages
import { Link, useNavigate } from "react-router-dom"

function Navbar(){
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  // NavBar Arrays
  let NavOptions = []
  let NavLinks = []
  let NavCSS = []
  let NavOnClick = []

  localStorage.getItem("authToken") ? NavOptions = ["Home", "My Orders", "My Cart", "LogOut"] : NavOptions = ["Home", "Login", "SignUp"]
  localStorage.getItem("authToken") ? NavLinks = ["/", "/myOrders", "/myCart", ""] : NavLinks = ["/", "/login", "/createUser"]
  localStorage.getItem("authToken") ? NavCSS = ["mr-auto", "", "", "mr-10 text-red-700"] : NavCSS = ["mr-auto", "", "mr-10"]
  localStorage.getItem("authToken") ? NavOnClick = ["", "", "", handleLogOut] : NavOnClick = ["", "", ""]


  return (
    <nav className="flex items-center gap-14 bg-blue-700 py-3 px-5">
      <span className="text-3xl font-serif">BestFood</span>

      <ul className="flex flex-1 text-xl">
        {
          NavOptions.map((e, i) => 
            <li key={e} className={`${NavCSS[i]} px-5 py-1 rounded-md hover:bg-blue-800 active:bg-blue-900`}>
              <Link to={NavLinks[i]} onClick={NavOnClick[i] != "" ? () => NavOnClick[i]() : ""}>{e}</Link>
            </li>
          )
        }
      </ul>

      {/* <div className="flex mx-10">
        <Link to="/login" className="text-xl px-5 py-1 rounded-md hover:bg-blue-800 active:bg-blue-900">Login</Link>
        <Link to="/createUser" className="text-xl px-5 py-1 rounded-md hover:bg-blue-800 active:bg-blue-900">SignUp</Link>
      </div> */}
    </nav>
  )
}

export default Navbar