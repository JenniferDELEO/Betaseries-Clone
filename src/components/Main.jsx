import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Episodes from "../pages/Episodes";
import Movies from "../pages/Movies";
import MyMovies from "../pages/MyMovies";
import MyShows from "../pages/MyShows";
import Planning from "../pages/Planning";
import Shows from "../pages/Shows";
import Login from "../pages/Login";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/my-shows" element={<MyShows />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/my-movies" element={<MyMovies />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
  );
};

export default Main;
