// Importing local files
import { useCart, useDispatchCart } from '../components/ContextReducer';

// Importing local images
import trash from '../Images/trash_bin.jpg'


export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if(data.length === 0){
    return(
      <div className="text-white bg-black min-h-lvh font-mono">        
        <div className="text-4xl py-40 flex justify-center items-center">The Cart is Empty!</div>
      </div>
    )
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div className="text-white bg-black min-h-lvh font-mono">

      <div className="flex flex-col items-center gap-10 py-10">
        <table>
          <thead>
            <tr className="text-blue-700 flex gap-28">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody className="">
            {data.map((food, index) => (
              <tr className="flex gap-16">
                <th scope="row">{ index + 1 }</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button"><img src={trash} className="size-20" onClick={() => {dispatchEvent({ type: "REMOVE", index: index }) }} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div><h1>Total Price: {totalPrice}/-</h1></div>
        
        <div>
          <button className="bg-blue-700 py-1 px-5 rounded-md">Check Out</button>
        </div>
      
      </div>
    </div>
  )
}