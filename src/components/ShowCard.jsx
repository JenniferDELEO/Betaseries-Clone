import React from "react";
import RatingStar from "./RatingStar";

const ShowCard = ({ show }) => {
  return (
    <div className="resultContainer">
      <img
        src={
          show.images && show.images.poster
            ? show.images.poster
            : "images/pas-dimage.webp"
        }
        alt="poster série"
      />
      <div className="mediaBody">
        <h2>
          {show.original_title.length > 20
            ? show.original_title.slice(0, 20) + "..."
            : show.original_title}
        </h2>
        {show.genres && Object.values(show.genres).length > 4 ? (
          <p>{Object.values(show.genres).slice(0, 4).join(", ")}...</p>
        ) : show.genres && Object.values(show.genres).length <= 4 ? (
          <p>{Object.values(show.genres).join(", ")}</p>
        ) : (
          ""
        )}
        <div className="platformsEpisodes">
          {show.platforms && show.platforms.svods ? (
            <div className="platformsContainer">
              Plateforme :{" "}
              {show.platforms.svods.map((platform) => (
                <p key={platform.id}>{platform.name}</p>
              ))}
            </div>
          ) : show.platforms && show.platforms.forced ? (
            <div className="platformsContainer">
              Plateforme :{" "}
              {show.platforms.forced.map((platform) => (
                <p key={platform.id}>{platform.name}</p>
              ))}
            </div>
          ) : (
            show.episodes > 0 && <p>{show.episodes} épisodes</p>
          )}
          {(show.platforms && show.platforms.svods) ||
          (show.platforms && show.platforms.forced) ? (
            <span>{show.episodes} épisodes</span>
          ) : (
            ""
          )}
        </div>
        {show.status && (
          <p>
            Statut :{" "}
            {show.status === "Ended"
              ? "Terminée"
              : show.status === "Continuing"
              ? "En cours"
              : ""}
          </p>
        )}
        <div className="flexContainer">
          {show.creation > 0 && <p>{show.creation}</p>}
          <RatingStar rate={parseInt(show.notes.mean)} key={show.id} />
        </div>
        {show.description && (
          <p className="description">
            {show.description.split(" ").slice(0, 20).join(" ")}...
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
