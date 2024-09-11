// IMporting React Icons
import { ImSpinner9 } from "react-icons/im";

// Importing local files
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

// Importing React Packages
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${import.meta.env.VITE_SERVER_LOCATION}/api/foodData`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      response = await response.json();
  
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  } ,[])

  return (
    <div className="flex flex-col bg-black text-white font-mono min-h-lvh overflow-x-hidden">
      {/* NavBar */}
      <Navbar />
      
      {/* Body */}
      <div className="flex flex-col gap-10">
        <Carousel search={search} setSearch={setSearch} />
        <div className="flex justify-start gap-10 flex-wrap px-5 sm:px-20 py-10">
          {error ? <span className="flex-1 text-2xl text-center text-red-500">{error}</span>
          :loading ?<span className="flex-1 text-blue-500 flex flex-col gap-10 justify-center items-center">
            <ImSpinner9 className="size-20 animate-spin" />
            <span>Getting Resources from the server. Please wait!!!</span>
          </span>
          :foodCat != [] 
            ?foodCat.map(e => {
              return(
                <div key={e.CategoryName} className="flex flex-col gap-5">
                  {e.CategoryName}
                  
                  <hr />
                  
                  <div className="flex gap-10 flex-wrap">
                    {foodItem != []
                      ?foodItem.filter(
                        f => (f.CategoryName === e.CategoryName)
                        && (f.name.toLowerCase().includes(search.toLowerCase()) )
                      ).map(filterItems => {
                          return(
                            <div key={filterItems._id}>
                              <Card data={filterItems} />
                            </div>
                          )
                        }
                      )
                      :<div>No Such Data Found</div>
                    }
                  </div>
                </div>
              )
            })
            : ""
          }
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}