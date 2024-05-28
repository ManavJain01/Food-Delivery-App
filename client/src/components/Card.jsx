// Importing Local Images
import chillyPanner from '../Images/chilly panner.jpg'

export default function Card() {
  return (
    <div className="flex flex-col w-fit border-2 border-gray-500 rounded-lg">
      <img
        src={chillyPanner}
        alt="Card Image"
        className="h-48 object-contain" />

      <div className="flex flex-col p-5">
        <h1>Card Title</h1>
        <p>This is some Important text.</p>
        <div>
          <select name="numbers" id="numbers" className="m-2 h-8 bg-blue-700 rounded-md">
            {Array.from(Array(6), (e,i)=>{
              return(
                <option key={i+1} value={i+1}>{i+1}</option>
              )
            })}
          </select>

          <select name="size" id="size" className="m-2 h-8 bg-blue-700 rounded-md">
            <option value="half">Half</option>
            <option value="half">Full</option>
          </select>

          <div className="inline-block">
            Total Price
          </div>
        </div>
      </div>
    </div>
  )
}