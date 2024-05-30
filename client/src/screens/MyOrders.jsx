// Importing local files
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

// Importing React Packages
import { useState, useEffect } from 'react';

export default function MyOrders() {
  // UseStates
  const [orderData, setOrderData] = useState("")

  // Functions
  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/myOrderData", {
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
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <div className="text-white bg-black flex flex-col justify-between min-h-lvh font-mono">
      <Navbar />

      <div>
        {orderData != {}
          ? Array(orderData).map(data => {
            return(
              data.orderData
                ?data.orderData.order_data.slice(0).reverse().map((item) => {
                  return(
                    item.map((arrayData) => {
                      return(
                        <div>
                          {arrayData.Order_date
                            ?<div>
                              {data = arrayData.Order_date}
                              <hr />
                            </div>
                          
                            :<div>
                                <img src={arrayData.img} alt='...' />
                                <div>
                                  <h1>{arrayData.name}</h1>
                                  <div>
                                    <span>{arrayData.qty}</span>
                                    <span>{arrayData.size}</span>
                                    <span>{data}</span>
                                    <span>rs.{arrayData.price}/-</span>
                                  </div>
                                </div>
                            </div>
                          }
                        </div>
                      )
                    })
                  )
                })
                
                : ""
            )
          })
          
          :""
        }
      </div>

      <Footer />
    </div>
  )
}