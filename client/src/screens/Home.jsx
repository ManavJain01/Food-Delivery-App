// Importing local files
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

// Importing React Packages
import { useState, useEffect } from "react";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch(`${import.meta.env.VITE_SERVER_LOCATION}/api/foodData`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData();
  } ,[])

  return (
    <div className="flex flex-col bg-black text-white font-mono min-h-lvh w-lvw overflow-x-hidden">
      {/* NavBar */}
      <Navbar />
      
      {/* Body */}
      <div className="flex flex-col gap-10">
        <Carousel search={search} setSearch={setSearch} />
        <div className="flex justify-start gap-10 flex-wrap px-5 sm:px-20 py-10">
          {foodCat != [] 
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