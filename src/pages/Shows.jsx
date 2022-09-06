import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import { countries, durations, initiales } from "../lib/caracteristics";
import { BiCaretRightSquare, BiRotateLeft } from "react-icons/bi";
import { FaTheaterMasks } from "react-icons/fa";
import {
  BsCalendarCheck,
  BsClock,
  BsFlag,
  BsCursorText,
  BsBookmark,
} from "react-icons/bs";
import { MdTimer } from "react-icons/md";
import { FiSliders } from "react-icons/fi";

const Shows = () => {
  const [showResults, setShowResults] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState({});
  const [openPlatform, setOpenPlatform] = useState(false);
  const [openGenre, setOpenGenre] = useState(false);
  const [openDiffusion, setOpenDiffusion] = useState(false);
  const [openCreationDate, setOpenCreationDate] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openDurationEpisode, setOpenDurationEpisode] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openInitiales, setOpenInitiales] = useState(false);
  const [openSaveFilter, setOpenSaveFilter] = useState(false);

  const openingPlatform = () => {
    setOpenPlatform(!openPlatform);
  };

  const openingGenre = () => {
    setOpenGenre(!openGenre);
  };

  const openingDiffusion = () => {
    setOpenDiffusion(!openDiffusion);
  };

  const openingCreationDate = () => {
    setOpenCreationDate(!openCreationDate);
  };

  const openingCountry = () => {
    setOpenCountry(!openCountry);
  };

  const openingDurationEpisode = () => {
    setOpenDurationEpisode(!openDurationEpisode);
  };

  const openingNew = () => {
    setOpenNew(!openNew);
  };

  const openingInitiales = () => {
    setOpenInitiales(!openInitiales);
  };

  const openingSaveFilter = () => {
    setOpenSaveFilter(!openSaveFilter);
  };

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
      <div className="searchFilter">
        <input type="text" placeholder="Nom de la série" />
        <button
          className="selectContainer"
          type="button"
          onClick={openingPlatform}
        >
          <BiCaretRightSquare />
          <span>Plateforme</span>
          <div className={openPlatform ? "menu-actif" : "menu"}>
            {platforms.map((platform) => (
              <p key={platform.id} value={platform.id}>
                {platform.name}
              </p>
            ))}
          </div>
        </button>
        <button className="selectContainer" onClick={openingGenre}>
          <FaTheaterMasks />
          <span>Genre</span>
          <div className={openGenre ? "menu-actif" : "menu"}>
            {Object.keys(genres).map((key, index) => (
              <p key={index} value={key}>
                {genres[key]}
              </p>
            ))}
          </div>
        </button>
        <button
          className="selectContainer"
          type="button"
          onClick={openingDiffusion}
        >
          <BsCalendarCheck />
          <span>Diffusion</span>
          <div className={openDiffusion ? "menu-actif" : "menu"}>
            <p value="Continuing">En cours</p>
            <p value="Ended">Terminée</p>
          </div>
        </button>
        <button
          type="button"
          className="selectContainer"
          onClick={openingCreationDate}
        >
          <BsClock />
          <span>Année de création</span>
          <div className={openCreationDate ? "menu-actif" : "menu"}>
            <p value="2022">2022</p>
            <p value="2021">2021</p>
            <p value="2020">2020</p>
            <p value="2019">2019</p>
            <p value="Autre">Autre</p>
          </div>
        </button>
        <button
          type="button"
          className="selectContainer"
          onClick={openingCountry}
        >
          <BsFlag />
          <span>Pays</span>
          <div className={openCountry ? "menu-actif" : "menu"}>
            <p value="États-Unis">États-Unis</p>
            <p value="Royaume-Uni">Royaume-Uni</p>
            <p value="Japon">Japon</p>
            <p value="Corée du Sud">Corée du Sud</p>
            <p value="France">France</p>
            <select name="other-country" value="Sélectionner un pays">
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </button>
        <button
          type="button"
          className="selectContainer"
          onClick={openingDurationEpisode}
        >
          <MdTimer />
          <span>Durée d'un épisode</span>
          <div className={openDurationEpisode ? "menu-actif" : "menu"}>
            {durations.map((duration) => (
              <p key={duration} value={duration}>
                {duration}
              </p>
            ))}
          </div>
        </button>
        <button type="button" className="selectContainer" onClick={openingNew}>
          <FiSliders />
          <span>Autres options</span>
          <div className={openNew ? "menu-actif" : "menu"}>
            <p>Uniquement les séries que je ne suis pas</p>
            <p>Uniquement les séries que je suis</p>
          </div>
        </button>
        <button
          type="button"
          className="selectContainer"
          onClick={openingInitiales}
        >
          <BsCursorText />
          <span>Initiales</span>
          <div className={openInitiales ? "menu-actif" : "menu"}>
            {initiales.map((initiale) => (
              <p key={initiale} value={initiale}>
                {initiale}
              </p>
            ))}
          </div>
        </button>
        <button
          type="button"
          className="selectContainer"
          onClick={openingSaveFilter}
        >
          <BsBookmark />
          <span>Filtre sauvegardé</span>
          <div className={openSaveFilter ? "menu-actif" : "menu"}>
            <input type="text" placeholder="Donner un nom à ce filtre" />
            <div>Sauvegardé ce filtre</div>
            <p>
              <span>Mes filtres</span>
            </p>
            <p>Vous n'avez pas encore de filtres sauvegardés</p>
          </div>
        </button>
        <button type="button" className="selectContainer">
          <BiRotateLeft />
          <span>Réinitialiser les filtres</span>
        </button>
      </div>
      <div>
        <h1>Annuaire des séries</h1>
        {showResults.map((show) => (
          <ShowCard show={show} key={show.id} />
        ))}
      </div>
    </div>
  );
};

export default Shows;
