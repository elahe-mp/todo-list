import React from "react";
import "./App.css";
import Home from "./Component/Pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Component/NavBar";
import About from "./Component/Pages/AboutPage/About";
import NoMatch from "./Component/Pages/NoMatch";
import Post from "./Component/Pages/PostPage/Post";
import Posts from "./Component/Pages/PostPage/Post";
// import ImageDetails from "./Component/Pages/GalleryPage/Gallery/ImageDetails";
const LazyGallery = React.lazy(
  () => import("./Component/Pages/GalleryPage/Gallery")
);
const LazyImageDetails = React.lazy(
  () => import("./Component/Pages/GalleryPage/Gallery/ImageDetails")
);

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gallery"
          element={
            <React.Suspense fallback="Loading...">
              <LazyGallery />
            </React.Suspense>
          }
        />
        <Route
          path="gallery/:title"
          element={
            <React.Suspense fallback="Loading...">
              <LazyImageDetails />
            </React.Suspense>
          }
        />
        <Route path="/post" element={<Post />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
