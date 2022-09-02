import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    async function request() {
      await axios
        .get(
          `https://api.betaseries.com/movies/search?key=${process.env.REACT_APP_KEY}&order=popularity&nbpp=12`,
          config
        )
        .then((res) => res.data)
        .then((data) => {
          setMovieResults(data.movies);
        });
    }
    request();
  }, []);
  return (
    <>
      <h1>Annuaire des films</h1>
      {movieResults.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </>
  );
};

export default Movies;
