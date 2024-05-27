// Importing React Packages
import { Link } from "react-router-dom"

function Navbar(){
  // NavBar Links
  const NavLinks = ["/", "login"]

  return (
    <nav className="flex gap-14 bg-green-700 py-3 px-5">
      <span>Food Delivery</span>

      <ul className="flex gap-5">
        {
          ["Home","Login"].map((e, i) => 
            <li key={e}>
              <Link to={NavLinks[i]}>{e}</Link>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar