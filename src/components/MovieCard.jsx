import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div>
      <img
        src={movie.poster ? movie.poster : "../assets/images/pas_dimage.webp"}
        alt="poster"
      />
      <p>{movie.title}</p>
    </div>
  );
};

export default MovieCard;
