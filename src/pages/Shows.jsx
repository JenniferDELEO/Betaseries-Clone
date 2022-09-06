import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";

const Shows = () => {
  const [showResults, setShowResults] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState({});

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
          `https://api.betaseries.com/platforms/list?key=${process.env.REACT_APP_KEY}&v=3.0`
        )
        .then((res) => res.data)
        .then((data) => setPlatforms(data.platforms.svod));

      await axios
        .get(
          `https://api.betaseries.com/shows/genres?key=${process.env.REACT_APP_KEY}&v=3.0`
        )
        .then((res) => res.data)
        .then((data) => setGenres(data.genres));

      await axios
        .get(
          `https://api.betaseries.com/shows/list?key=${process.env.REACT_APP_KEY}&v=3.0&order=popularity&filter=new`,
          config
        )
        .then((res) => res.data)
        .then((data) => {
          setShowResults(data.shows);
        });
    }
    request();
  }, []);

  return (
    <div className="shows">
      <div className="SearchFilter">
        <input type="text" placeholder="Nom de la série" />
        <select name="platforms" id="platforms">
          <option value="Plateforme">Plateforme</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
        <select name="genres" id="genres">
          <option value="Genre">Genre</option>
          {Object.keys(genres).map((key, index) => (
            <option key={index} value={key}>
              {genres[key]}
            </option>
          ))}
        </select>
        <select name="diffusion" id="diffusion">
          <option value="Diffusion">Diffusion</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
        <select name="creation" id="creation">
          <option value="Année de création">Année de création</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <h1>Annuaire des séries</h1>
      {showResults.map((show) => (
        <ShowCard show={show} key={show.id} />
      ))}
    </div>
  );
};

export default Shows;
