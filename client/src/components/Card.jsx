export default function Card({ data }) {
  let options = data.options[0];
  let priceOptions = Object.keys(options);

  return (
    <div className="flex flex-col w-[18rem] border-2 border-gray-500 rounded-lg">
      <img
        src={data.img}
        alt="Card Image"
        className="h-48" />

      <div className="flex flex-col p-3">
        <h1 className="text-xl mb-5">{data.name}</h1>
        <p className="text-sm text-gray-500">{data.description}</p>
        <div>
          <select name="numbers" id="numbers" className="m-2 h-8 bg-blue-700 rounded-md">
            {Array.from(Array(6), (e,i)=>{
              return(
                <option key={i+1} value={i+1}>{i+1}</option>
              )
            })}
          </select>

          <select name="size" id="size" className="m-2 h-8 bg-blue-700 rounded-md">
            {priceOptions.map(e => {
              return(
                <option key={e} value={e}>{e}</option>
              )
            })}
          </select>

          <div className="inline-block">
            Total Price
          </div>
        </div>
      </div>
    </div>
  )
}