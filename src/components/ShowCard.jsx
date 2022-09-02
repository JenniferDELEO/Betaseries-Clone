import React from "react";

const Card = ({ show }) => {
  return (
    <div>
      <img
        src={
          show.images.poster
            ? show.images.poster
            : "../assets/images/pas_dimage.webp"
        }
        alt="poster"
      />
      <p>{show.title}</p>
    </div>
  );
};

export default Card;
