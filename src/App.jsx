import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />

      {/* Temporary placeholder for the next section */}
      <section
        id="about"
        className="grid min-h-screen place-items-center bg-[#0b0b12] text-3xl text-white"
      >
        Next section
      </section>
      <Footer/>
    </>
  );
}