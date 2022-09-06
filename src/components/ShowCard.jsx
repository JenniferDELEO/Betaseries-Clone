import React from "react";

const ShowCard = ({ show }) => {
  return (
    <div className="resultContainer">
      <img
        src={show.images.poster ? show.images.poster : "images/pas-dimage.webp"}
        alt="poster série"
      />
      <div>
        <h2>
          {show.title.length > 20
            ? show.title.slice(0, 20) + "..."
            : show.title}
        </h2>
        {Object.keys(show.genres)
          ? Object.keys(show.genres)
              .slice(0, 4)
              .map((key, index) => (
                <p key={index} value={key}>
                  {show.genres[key]}
                </p>
              ))
          : ""}
        <p>
          Plateforme :{" "}
          {/* {show.platforms.svods[0] !== null
            ? show.platforms.svods[0].name
            : show.platforms.svod !== null
            ? show.platforms.svod.name
            : ""} */}
        </p>
        <p>{show.creation}</p>
      </div>
    </div>
  );
};

export default ShowCard;
