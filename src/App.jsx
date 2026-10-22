import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import BrushSection from "./components/BrushSection";
import GalleryAbout from "./components/GalleryAbout";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <GalleryAbout/>
      <BrushSection/>
    </>
  );
}