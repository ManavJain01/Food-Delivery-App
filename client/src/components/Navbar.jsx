// Importing React Packages
import { Link } from "react-router-dom"

function Navbar(){
  // NavBar Links
  const NavLinks = ["/", "login"]

  return (
    <nav className="flex items-center gap-14 bg-green-700 py-3 px-5">
      <span className="text-3xl font-serif">BestFood</span>

      <ul className="flex">
        {
          ["Home","Login"].map((e, i) => 
            <li key={e} className="text-xl px-5 py-1 rounded-md hover:bg-green-800 active:bg-green-900">
              <Link to={NavLinks[i]}>{e}</Link>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar