// Importing React Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

// Importing React Packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

function Navbar(){
  // Initialising Navigation
  const navigate = useNavigate();

  // UseStates
  const [showMenu, setShowMenu] = useState(false)

  // Functions
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  window.onresize = window.onload = function() {
    if(this.innerWidth > 768){
      setShowMenu(false)
    }
  }

  // NavBar Arrays
  let NavOptions = []
  let NavLinks = []
  let NavCSS = []
  let NavOnClick = []

  // Check if logged in or not
  localStorage.getItem("authToken") ? NavOptions = ["Home", "My Orders", "My Cart", "LogOut"] : NavOptions = ["Home", "Login", "SignUp"]
  localStorage.getItem("authToken") ? NavLinks = ["/", "/myOrders", "/myCart", ""] : NavLinks = ["/", "/login", "/createUser"]
  localStorage.getItem("authToken") ? NavCSS = ["md:mr-auto", "", "", "md:mr-10 text-red-700"] : NavCSS = ["mr-auto", "", "mr-10"]
  localStorage.getItem("authToken") ? NavOnClick = ["", "", "", handleLogOut] : NavOnClick = ["", "", ""]


  return (
    <nav className="relative flex items-center gap-14 bg-blue-700 py-3 px-5">
      {/* Title */}
      <span className="text-3xl font-serif">BestFood</span>

      {/* My NavBar Options */}
      <ul className={`${showMenu ? "z-20 fixed top-0 left-0 w-lvw h-lvh bg-black flex-col" : "z-0 relative flex-row"} flex flex-1 text-xl`}>
        {
          NavOptions.map((e, i) => 
            <li key={e} className={`${NavCSS[i]} ${showMenu ? "flex justify-center relative top-20" : "hidden md:flex"} px-5 py-1 rounded-md hover:bg-blue-800 active:bg-blue-900`}>
              <Link to={NavLinks[i]} onClick={NavOnClick[i] != "" ? () => NavOnClick[i]() : ""}>{e}</Link>
            </li>
          )
        }
      </ul>

      {/* My HamMenu */}
      {showMenu 
        ?<ImCross onClick={() => setShowMenu(false)} className="size-8 absolute right-10 top-5 md:hidden z-30" /> 
        :<GiHamburgerMenu onClick={() => setShowMenu(true)} className="size-8 md:hidden mr-5" />
        }
    </nav>
  )
}

export default Navbar