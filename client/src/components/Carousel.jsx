// Importing React Icons
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

// Importing local files
import { slides } from "../data/carouselData.json"

// Importing React Packages
import { useState } from 'react'

export default function Carousel(){
  const [slide, setSlide] = useState(0)

  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1)
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1)
  }

  return (
    <div className="relative flex flex-col gap-10">
      {/* Carousel */}
      <div className="relative flex justify-center items-center">
         {/* Left Arrow */}
         <BsArrowLeftCircleFill onClick={() => prevSlide()} className="absolute left-5 w-8 h-8 cursor-pointer" />

         {/* Slides */}
         {slides.map((e, i) => 
          <img
            src={e.src}
            alt={e.alt}
            key={i}
            className={slide === i ? "w-lvw h-[30rem] object-cover rounded-md shadow-md shadow-gray-800" : "hidden" } />
        )}

        {/* Right Arrow */}
        <BsArrowRightCircleFill onClick={() => nextSlide()} className="absolute right-14 w-8 h-8 cursor-pointer" />

        {/* Indicators */}
        {/* <span className="absolute flex bottom-5">
          {slides.map((_, i) => 
            <button
              key={i}
              onClick={() => {setSlide(i)}}
              className={`h-2 w-2 m-1 ${slide === i ? "bg-white" : "bg-gray-400"} rounded-full cursor-pointer`} />
          )}
        </span> */}
      </div>

      {/* Search Bar */}
      <form className="absolute bottom-10 z-10 flex w-full px-20 gap-3">
        <input type="search" placeholder="Search" className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-md outline-none" />
        <button type="submit" className="text-black font-bold bg-blue-400 px-5 py-1 rounded-md">Search</button>
      </form>
    </div>
  )
}