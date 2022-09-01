import React from "react";

const Card = ({ result }) => {
  return (
    <div>
      <img
        src={
          result.poster
            ? result.poster
            : result.images.poster
            ? result.images.poster
            : "../assets/images/pas_dimage.webp"
        }
        alt="poster"
      />
      <p>{result.title}</p>
    </div>
  );
};

export default Card;
