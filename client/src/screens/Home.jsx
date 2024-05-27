// Importing local files
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-black text-white h-lvh w-lvw">
      <Navbar />
      <div>Body</div>
      <Footer />
    </div>
  )
}