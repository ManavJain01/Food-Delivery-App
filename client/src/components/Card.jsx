// Importing local files
import { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";


export default function Card({ data }) {
  let dispatch = useDispatchCart();
  let cartData = useCart();
  
  // UseRef
  const priceRef = useRef();

  // UseStates
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  // Initailising and declaring variables
  let options = data.options[0];
  let priceOptions = Object.keys(options);
  let finalPrice = qty * parseInt(options[size]);
  

  // Functions
  const handleAddToCart = async() => {
    let food = []
    for (const item of cartData){
      if(item.id === data._id){
        food = item;

        break;
      }
    }
    if(food != []){
      if(food.size === size){
        await dispatch({ type: "UPDATE", id: data._id, price: finalPrice, qty: qty })
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD", id: data._id, name:data.name, img:data.img, price:finalPrice, qty: qty, size: size})
        return
      }
      return
    }

    await dispatch({type:"ADD", id: data._id, name:data.name, img:data.img, price:finalPrice, qty: qty, size: size})
  }

  // useEffect
  useEffect(() => {
    setSize(priceRef.current.value)
  } ,[])


  return (
    <div className="flex flex-col w-[18rem] border-2 border-gray-500 rounded-lg">
      {/* Card Image */}
      <img
        src={data.img}
        alt="..."
        className="h-48" />

      {/* Card Data */}
      <div className="flex flex-col p-3">
        <h1 className="text-xl mb-5">{data.name}</h1>
        <p className="text-sm text-gray-500">{data.description}</p>
        
        {/* Card Options */}
        <div>
          <select name="numbers" id="numbers" onChange={(e)=> setQty(e.target.value)} className="m-2 h-8 bg-blue-700 rounded-md">
            {Array.from(Array(6), (e,i)=>{
              return(
                <option key={i+1} value={i+1}>{i+1}</option>
              )
            })}
          </select>

          <select name="size" id="size" ref={priceRef} onChange={(e)=> setSize(e.target.value)} className="m-2 h-8 bg-blue-700 rounded-md">
            {priceOptions.map(e => {
              return(
                <option key={e} value={e}>{e}</option>
              )
            })}
          </select>

          <div className="inline-block">
            rs.{finalPrice}/-
          </div>
        </div>

        <hr className="border-gray-700" />
        
        {/* Add TO Cart Button */}
        <button onClick={handleAddToCart} className="bg-blue-700 mt-2 px-5 py-1 rounded-lg hover:bg-blue-800 active:bg-blue-900">Add To Cart</button>
      </div>
    </div>
  )
}