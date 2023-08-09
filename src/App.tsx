import "./App.css";
import Home from "./Component/Pages/Home";
import { Routes, Route } from "react-router-dom";
import Gallery from "./Component/Pages/GalleryPage/Gallery";
import NavBar from "./Component/NavBar";
import About from "./Component/Pages/AboutPage/About";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
