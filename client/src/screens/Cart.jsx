// Importing local files
import { useCart, useDispatchCart } from '../components/ContextReducer';

// Importing local images
import trash from '../Images/trash_bin.jpg'

// Importing React Packages

export default function Cart() {
  // My Context API
  let data = useCart();
  let dispatch = useDispatchCart();

  // My Empty Cart
  if(data.length === 0){
    return(
      <div className="text-white bg-black min-h-lvh font-mono">        
        <div className="text-4xl py-40 flex justify-center items-center">The Cart is Empty!</div>
      </div>
    )
  }

  // Functions
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${import.meta.env.VITE_SERVER_LOCATION}/api/orderData`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        order_data:data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if(response.status === 200){
      dispatch({type:"DROP"})
    }
  }

  // Total Price
  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div className="text-white bg-black h-full font-mono">

      <div className="flex flex-col items-center gap-10 py-20">
        <table>
          <thead>
            <tr className="text-blue-700 flex /justify-around gap-20">
              <th scope="col">#</th>
              <th scope="col" className="mr-20">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="flex justify-between gap-20">
                <th scope="row">{ index + 1 }</th>
                <td className="whitespace-nowrap">{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button"><img src={trash} alt="delete" className="size-8" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div><h1>Total Price: {totalPrice}/-</h1></div>
        
        <div>
          <button onClick={handleCheckOut} className="bg-blue-700 py-1 px-5 rounded-md">Check Out</button>
        </div>
      
      </div>
    </div>
  )
}