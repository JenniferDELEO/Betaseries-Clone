import React from "react";

const SearchMovies = ({ movie }) => {
  return (
    <div className="resultContainer">
      <img
        src={movie.poster ? movie.poster : "images/pas-dimage.webp"}
        alt="poster film"
      />
      <div>
        <h3>
          {movie.title.length > 25
            ? movie.title.slice(0, 25) + "..."
            : movie.title}
        </h3>
        <p>{movie.production_year}</p>
      </div>
    </div>
  );
};

export default SearchMovies;
