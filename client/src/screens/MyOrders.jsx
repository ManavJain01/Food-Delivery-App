// Importing React Icons
import { ImSpinner9 } from "react-icons/im";

// Importing local files
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

// Importing React Packages
import { useState, useEffect } from 'react';

export default function MyOrders() {
  // UseStates
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orderData, setOrderData] = useState("")

  // Functions
  const fetchMyOrder = async () => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_SERVER_LOCATION}/api/myOrderData`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      }).then(async (res) => {
        let response = await res.json()
        setOrderData(response)
      })
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <div className="text-white bg-black flex flex-col justify-between gap-10 min-h-lvh font-mono">
      <Navbar />

      <div className="flex-1 flex flex-col gap-5">
        {loading ?<p className="text-4xl text-blue-500 flex flex-col items-center gap-2">
          <ImSpinner9 className="size-20 animate-spin" />
          <span>Processing...</span>
        </p>
        :orderData != {}
          ? Array(orderData).map(data => {
            return(
              data.orderData
                ?data.orderData.order_data.slice(0).reverse().map((item) => {
                  return(
                        item.map((arrayData) => {
                          return(
                            <div key={arrayData.id}>
                              {arrayData.Order_date
                                ?<div className="text-2xl flex flex-col gap-2">
                                  <span className="px-5">{data = arrayData.Order_date}</span>
                                  <hr />
                                </div>
                              
                                :<div className="ml-5 mt-5 flex gap-5 w-fit border-2 border-gray-700">
                                    <img src={arrayData.img} alt='...' className="w-20" />
                                    <div className="py-2 flex flex-col justify-between">
                                      <h1>{arrayData.name}</h1>
                                      <div className="text-gray-500 text-sm flex flex-col pr-5">
                                        <span>Quantity: {arrayData.qty}</span>
                                        <span>Size: {arrayData.size}</span>
                                        <span>Order placed on {data}</span>
                                        <span>Total Amount: rs.{arrayData.price}/-</span>
                                      </div>
                                    </div>
                                </div>
                              }
                            </div>
                          )
                        })
                  )
                })
                
              : <div className="text-3xl flex justify-center my-20">
                  No History Found!!!
                </div>
            )
          })
          
          :""
        }
        {error && <span className="text-center text-3xl text-red-600">{error}</span>}
      </div>

      <Footer />
    </div>
  )
}