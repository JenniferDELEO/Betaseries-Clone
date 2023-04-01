import React from "react";

const SearchShows = ({ show }) => {
  return (
    <div className="resultContainer">
      <img
        src={show.images.poster ? show.images.poster : "images/pas-dimage.webp"}
        alt="poster série"
      />
      <div>
        <h3>
          {show.title.length > 25
            ? show.title.slice(0, 25) + "..."
            : show.title}
        </h3>
        <p>{show.creation}</p>
      </div>
    </div>
  );
};

export default SearchShows;
