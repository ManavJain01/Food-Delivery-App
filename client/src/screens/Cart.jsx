// Importing local files
import Navbar from '../components/Navbar';
import { useCart, useDispatchCart } from '../components/ContextReducer';

// Importing local images
import trash from '../Images/trash_bin.jpg'


export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if(data.length === 0){
    return(
      <div>
        <div>The Cart is Empty!</div>
      </div>
    )
  }

  return (
    <div className="text-white bg-black min-h-lvh font-mono">
      <Navbar />

      <div className="flex flex-col items-center gap-10 py-10">
        <table>
          <thead>
            <tr className="text-blue-700 flex gap-20">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>

          {/* <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{ index + 1 }</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button"><img src={trash} onClick={() => {dispatchEvent({})}} /></button></td>
              </tr>
            ))}
          </tbody> */}
        </table>

        {/* <div><h1>Total Price: {totalPrice}/-</h1></div> */}
        
        <div>
          <button className="bg-blue-700 py-1 px-5 rounded-md">Check Out</button>
        </div>
      
      </div>
    </div>
  )
}