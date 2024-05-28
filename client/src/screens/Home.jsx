// Importing local files
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col bg-black text-white font-mono min-h-lvh w-lvw overflow-x-hidden">
      {/* NavBar */}
      <Navbar />
      
      {/* Body */}
      <div className="flex flex-col gap-10">
        <Carousel />
        <div className="px-20 py-10">
          <Card />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}