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
    <div className="text-white bg-black h-full font-mono overflow-auto">

      <div className="flex flex-col items-center gap-10 py-20">
        <table className="w-[80%] border-2 border-gray-700">
          <thead>
            <tr className="text-blue-700 border-2 border-gray-700 border-collapse">
              <th scope="col" className="p-3 text-left tracking-wide border-2 border-gray-700 border-collapse">#</th>
              <th scope="col" className="p-3 w-full text-left tracking-wide border-2 border-gray-700 border-collapse">Name</th>
              <th scope="col" className="p-3 text-left tracking-wide border-2 border-gray-700 border-collapse">Quantity</th>
              <th scope="col" className="p-3 text-left tracking-wide border-2 border-gray-700 border-collapse">Option</th>
              <th scope="col" className="p-3 text-left tracking-wide border-2 border-gray-700 border-collapse">Amount</th>
              <th scope="col" className="p-3 text-left tracking-wide border-2 border-gray-700 border-collapse">Remove</th>
            </tr>
          </thead>

          <tbody>
            {data.map((food, index) => (
              <tr key={index} className={`${index%2==0 ? "text-gray-400" : "text-white"} text-sm border-2 border-gray-700 border-collapse`}>
                <th className="px-5" scope="row">{ index + 1 }</th>
                <td className="px-5 whitespace-nowrap border-2 border-gray-700 border-collapse">{food.name}</td>
                <td className="px-5 border-2 border-gray-700 border-collapse">{food.qty}</td>
                <td className="px-5 border-2 border-gray-700 border-collapse">{food.size}</td>
                <td className="px-5 border-2 border-gray-700 border-collapse">{food.price}</td>
                <td className="px-5 border-2 border-gray-700 border-collapse"><button type="button"><img src={trash} alt="delete" className="size-8 mt-2" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
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