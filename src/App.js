import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Episodes from "./pages/Episodes";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MyMovies from "./pages/MyMovies";
import MyShows from "./pages/MyShows";
import Planning from "./pages/Planning";
import Shows from "./pages/Shows";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/my-shows" element={<MyShows />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/my-movies" element={<MyMovies />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
