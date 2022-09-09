import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import {
  countries,
  otherCountries,
  durations,
  initiales,
} from "../lib/caracteristics";
import { BiCaretRightSquare, BiRotateLeft } from "react-icons/bi";
import { FaTheaterMasks, FaSearch } from "react-icons/fa";
import {
  BsCalendarCheck,
  BsClock,
  BsFlag,
  BsCursorText,
  BsBookmark,
} from "react-icons/bs";
import { MdTimer } from "react-icons/md";
import { FiSliders, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import Pagination from "../components/Pagination";

const Shows = () => {
  const [showList, setShowList] = useState([]);
  const [showResult, setShowResult] = useState([]);
  const [showResultOneOnly, setShowResultOneOnly] = useState({});
  const [showsNumber, setShowsNumber] = useState(null);
  const [showsId, setShowsId] = useState([]);
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
  const [text, setText] = useState("");
  const limit = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGenre, setFilterGenre] = useState([]);
  const [filterDiffusion, setFilterDiffusion] = useState([]);
  const [filterEpisodeDuration, setFilterEpisodeDuration] = useState([]);
  const [filterPlatform, setFilterPlatform] = useState([]);
  const [filterCreationDate, setFilterCreationDate] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterInitiale, setFilterInitiale] = useState("");
  const [filterOrder, setFilterOrder] = useState("popularity");
  const [filterFilter, setFilterFilter] = useState("new");

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
        .then((data) => {
          setPlatforms(data.platforms.svod);
        });

      await axios
        .get(
          `https://api.betaseries.com/shows/genres?key=${process.env.REACT_APP_KEY}&v=3.0`
        )
        .then((res) => res.data)
        .then((data) => setGenres(data.genres));

      await axios
        .get(
          `https://api.betaseries.com/search/shows?key=${
            process.env.REACT_APP_KEY
          }&v=3.0&text=${text}&limit=${limit}&offset=${
            currentPage - 1
          }&genres=${filterGenre}&diffusions=${filterDiffusion}&duration=${filterEpisodeDuration}&svods=${filterPlatform}&creations=${filterCreationDate}&pays=${filterCountry}&debut=${filterInitiale}&tri=${filterOrder}&autres=${filterFilter}`,
          config
        )
        .then((res) => res.data)
        .then((data) => {
          setShowList(data.shows);
          setShowsNumber(data.total);
        });
    }
    request();
  }, [
    text,
    limit,
    currentPage,
    filterGenre,
    filterDiffusion,
    filterEpisodeDuration,
    filterPlatform,
    filterCreationDate,
    filterCountry,
    filterInitiale,
    filterOrder,
    filterFilter,
  ]);

  useEffect(() => {
    async function request() {
      const idList = [];
      showList.map((show) => idList.push(show.id));
      setShowsId(idList.join(","));
      idList.length !== 0 &&
        (await axios
          .get(
            `https://api.betaseries.com/shows/display?key=${process.env.REACT_APP_KEY}&v=3.0&id=${showsId}`
          )
          .then((res) => res.data)
          .then((data) =>
            idList.length > 1
              ? setShowResult(data.shows)
              : setShowResultOneOnly(data.show)
          ));
    }
    request();
  }, [showList, showsId]);

  return (
    <>
      <div className="shows">
        <div className="searchFilter">
          <div className="searchInput">
            <FaSearch size={15} />
            <input type="text" placeholder="Nom de la série" />
          </div>
          <div className="selectContainer">
            <div
              onClick={openingPlatform}
              className={
                openPlatform ? `selectTitle selectTitleOpen` : "selectTitle"
              }
            >
              <BiCaretRightSquare size={25} />
              <span>Plateforme</span>
              {openPlatform ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openPlatform ? "menu-actif" : "menu"}>
              {platforms.map((platform) => (
                <p
                  key={platform.id}
                  onClick={() => {
                    filterPlatform.includes(platform.id)
                      ? setFilterPlatform(
                          filterPlatform.filter((a) => a !== platform.id)
                        )
                      : setFilterPlatform((prevState) => {
                          return [...prevState, platform.id];
                        });
                  }}
                  className={
                    filterPlatform.includes(platform.id) ? "filterSelected" : ""
                  }
                >
                  {platform.name}
                </p>
              ))}
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openGenre ? `selectTitle selectTitleOpen` : "selectTitle"
              }
              onClick={openingGenre}
            >
              <FaTheaterMasks size={25} />
              <span>Genre</span>
              {openGenre ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openGenre ? "menu-actif" : "menu"}>
              {Object.keys(genres).map((key, index) => (
                <p key={index} value={key}>
                  {genres[key]}
                </p>
              ))}
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openDiffusion ? `selectTitle selectTitleOpen` : "selectTitle"
              }
              onClick={openingDiffusion}
            >
              <BsCalendarCheck size={25} />
              <span>Diffusion</span>
              {openDiffusion ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openDiffusion ? "menu-actif" : "menu"}>
              <p value="Continuing">En cours</p>
              <p value="Ended">Terminée</p>
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openCreationDate ? `selectTitle selectTitleOpen` : "selectTitle"
              }
              onClick={openingCreationDate}
            >
              <BsClock size={25} />
              <span>Année de création</span>
              {openCreationDate ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>

            <div className={openCreationDate ? "menu-actif" : "menu"}>
              <p value="2022">2022</p>
              <p value="2021">2021</p>
              <p value="2020">2020</p>
              <p value="2019">2019</p>
              <p value="Autre">Autre</p>
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openCountry ? `selectTitle selectTitleOpen` : "selectTitle"
              }
              onClick={openingCountry}
            >
              <BsFlag size={25} />
              <span>Pays</span>
              {openCountry ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openCountry ? "menu-actif" : "menu"}>
              {countries.map((country) => (
                <p key={country.id} value={country.id}>
                  {country.name}
                </p>
              ))}
              <select name="other-country">
                <option value="">Sélectionner un pays</option>
                {otherCountries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openDurationEpisode
                  ? `selectTitle selectTitleOpen`
                  : "selectTitle"
              }
              onClick={openingDurationEpisode}
            >
              <MdTimer size={25} />
              <span>Durée d'un épisode</span>
              {openDurationEpisode ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openDurationEpisode ? "menu-actif" : "menu"}>
              {durations.map((duration) => (
                <p key={duration} value={duration}>
                  {duration}
                </p>
              ))}
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openNew ? `selectTitle selectTitleOpen` : "selectTitle"
              }
              onClick={openingNew}
            >
              <FiSliders size={25} />
              <span>Autres options</span>
              {openNew ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openNew ? "menu-actif" : "menu"}>
              <p
                value="new"
                onClick={() => {
                  filterFilter === "new"
                    ? setFilterFilter()
                    : setFilterFilter("new");
                }}
                className={filterFilter === "new" ? "filterSelected" : ""}
              >
                Uniquement les séries que je ne suis pas
              </p>
              <p
                value=""
                onClick={() => {
                  filterFilter === ""
                    ? setFilterFilter("new")
                    : setFilterFilter();
                }}
                className={filterFilter === "new" ? "filterSelected" : ""}
              >
                Uniquement les séries que je suis
              </p>
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openInitiales ? `selectTitle selectTitleOpen` : "selectTitle"
              }
              onClick={openingInitiales}
            >
              <BsCursorText size={25} />
              <span>Initiales</span>
              {openInitiales ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openInitiales ? "initiales-actif" : "menu"}>
              {initiales.map((initiale) => (
                <p
                  key={initiale}
                  value={initiale}
                  onClick={() => {
                    filterInitiale === initiale
                      ? setFilterInitiale("")
                      : setFilterInitiale(initiale);
                  }}
                  className={
                    filterInitiale === initiale ? "filterSelected" : ""
                  }
                >
                  {initiale}
                </p>
              ))}
            </div>
          </div>
          <div className="selectContainer">
            <div
              className={
                openSaveFilter ? `selectTitle selectTitleOpen` : "selectTitle"
              }
              onClick={openingSaveFilter}
            >
              <BsBookmark size={25} />
              <span>Filtre sauvegardé</span>
              {openSaveFilter ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}
            </div>
            <div className={openSaveFilter ? "menu-actif" : "menu"}>
              <input type="text" placeholder="Donner un nom à ce filtre" />
              <button type="button">Sauvegardé ce filtre</button>
              <p className="saveParagraph">
                <span>Mes filtres</span>
              </p>
              <p className="saveParagraph">
                Vous n'avez pas encore de filtres sauvegardés
              </p>
            </div>
          </div>
          <button type="button" className="selectContainer">
            <div className="reinitiate">
              <BiRotateLeft size={25} />
              <span>Réinitialiser les filtres</span>
            </div>
          </button>
        </div>
        <div className="listShows">
          <div className="mainTitle">
            <h1>Annuaire des séries</h1>
            <p className="sorting">
              Popularité <IoMdArrowDropdown />
            </p>
          </div>
          <div className="showCard">
            {showResult.length > 0 &&
              showResult.map((show) => <ShowCard show={show} key={show.id} />)}
            {showResultOneOnly.length > 0 && (
              <ShowCard show={showResultOneOnly} />
            )}
          </div>
        </div>
      </div>
      <div className="paginationShows">
        <Pagination
          index={Math.ceil(showsNumber / limit)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Shows;
