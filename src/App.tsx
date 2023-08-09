import "./App.css";
import Home from "./Component/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./Component/Pages/GalleryPage/Gallery";
import NavBar from "./Component/NavBar";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
