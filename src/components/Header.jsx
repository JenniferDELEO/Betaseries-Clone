import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import { IoMdFilm, IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import SearchShows from "./SearchShows";
import SearchMovies from "./SearchMovies";
import betaseriesIcon from "../assets/betaseries.svg";

const Header = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResultShow, setSearchResultShow] = useState([]);
  const [searchResultMovie, setSearchResultMovie] = useState([]);
  const [nbpp, setNbpp] = useState(5);
  const ref = useRef(null);
  const safeDocument = typeof document !== "undefined" ? document : {};
  const scrollBlocked = useRef();
  const html = safeDocument.documentElement;
  const { body } = safeDocument;

  const blockScroll = () => {
    if (!body || !body.style || scrollBlocked.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    html.style.position = "relative"; /* [1] */
    html.style.overflow = "hidden"; /* [2] */
    body.style.position = "relative"; /* [1] */
    body.style.overflow = "hidden"; /* [2] */
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scrollBlocked.current = true;
  };

  const allowScroll = () => {
    if (!body || !body.style || !scrollBlocked.current) return;

    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    scrollBlocked.current = false;
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(
        `https://api.betaseries.com/shows/search?key=${process.env.REACT_APP_KEY}&v=3.0&title=${searchInput}&nbpp=${nbpp}`,
        config
      )
      .then((res) => res.data)
      .then((data) => setSearchResultShow(data.shows));

    axios
      .get(
        `https://api.betaseries.com/movies/search?key=${process.env.REACT_APP_KEY}&v=3.0&title=${searchInput}&nbpp=${nbpp}`,
        config
      )
      .then((res) => res.data)
      .then((data) => setSearchResultMovie(data.movies));
  }, [searchInput, nbpp, location, token]);

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    navigate("../", { replace: true });
  };

  async function handleFocusOnSearch() {
    setSearch(!search);
    ref.current.focus();
    blockScroll();
  }

  const handleSearchClose = () => {
    setSearch(!search);
    setSearchInput("");
    allowScroll();
  };

  return (
    <div className="header">
      <nav
        className={
          location.pathname.includes("show/")
            ? "navShowContainer navContainer"
            : "navContainer"
        }
      >
        {token ? (
          search ? (
            <div className="searchContainer">
              <div className="title">
                <NavLink to="/">
                  <img src={betaseriesIcon} alt="logo betaseries" />
                </NavLink>
              </div>
              <div className="searchSection">
                <div>
                  <BsSearch size={20} />
                </div>
                <form>
                  <input
                    className="searchInput"
                    type="text"
                    placeholder="Rechercher une série, un film"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    ref={ref}
                  />
                </form>
                <div>
                  <IoMdClose
                    size={20}
                    onClick={handleSearchClose}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar">
              <ul>
                <div className="title">
                  <NavLink to="/">
                    <img src={betaseriesIcon} alt="logo betaseries" />
                  </NavLink>
                </div>
                <div className="navbarIntern">
                  <NavLink
                    to="/"
                    className={(nav) =>
                      nav.isActive ? `nav nav-active` : "nav"
                    }
                  >
                    <li>
                      <AiFillHome
                        size={20}
                        style={{
                          width: "40px",
                        }}
                      />
                      <p className="mediaQuery">Accueil</p>
                    </li>
                  </NavLink>
                  <div className="navbar-dropdown">
                    <NavLink
                      to="/shows"
                      className={
                        location.pathname.includes("show")
                          ? `nav nav-active`
                          : "nav"
                      }
                    >
                      <li>
                        <MdComputer
                          size={20}
                          style={{
                            width: "40px",
                          }}
                        />
                        <p className="mediaQuery">Séries</p>
                      </li>
                    </NavLink>
                    <div className="dropdown-content">
                      <NavLink
                        to="/shows"
                        className={
                          location.pathname.includes("show")
                            ? "navDropdown"
                            : ""
                        }
                      >
                        Toutes les séries
                      </NavLink>
                      <NavLink
                        to="/my-shows"
                        className={
                          location.pathname.includes("myshow")
                            ? "navDropdown"
                            : ""
                        }
                      >
                        Mes séries
                      </NavLink>
                      <NavLink
                        to="/episodes"
                        className={
                          location.pathname.includes("episodes")
                            ? "navDropdown"
                            : ""
                        }
                      >
                        Episodes à voir
                      </NavLink>
                      <NavLink
                        to="/planning"
                        className={
                          location.pathname.includes("planning")
                            ? "navDropdown"
                            : ""
                        }
                      >
                        Planning des sorties
                      </NavLink>
                    </div>
                  </div>
                  <div className="navbar-dropdown">
                    <NavLink
                      to="/movies"
                      className={
                        location.pathname.includes("movie")
                          ? `nav nav-active`
                          : "nav"
                      }
                    >
                      <li>
                        <IoMdFilm
                          size={20}
                          style={{
                            width: "40px",
                          }}
                        />
                        <p className="mediaQuery">Films</p>
                      </li>
                    </NavLink>
                    <div className="dropdown-content">
                      <NavLink
                        to="/movies"
                        className={
                          location.pathname.includes("/movies")
                            ? "navDropdown"
                            : ""
                        }
                      >
                        Tous les films
                      </NavLink>
                      <NavLink
                        to="/my-movies"
                        className={
                          location.pathname.includes("my-movies")
                            ? "navDropdown"
                            : ""
                        }
                      >
                        Mes films
                      </NavLink>
                    </div>
                  </div>
                </div>
              </ul>
              <div className="connection">
                <NavLink to="/profil">Profil</NavLink>
                <NavLink to="/" onClick={() => handleLogOut()}>
                  Se déconnecter
                </NavLink>
                <div className="searchIcon">
                  <BsSearch
                    size={20}
                    onClick={handleFocusOnSearch}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          )
        ) : search ? (
          <div className="searchContainer">
            <div className="title">
              <NavLink to="/">
                <img src={betaseriesIcon} alt="logo betaseries" />
              </NavLink>
            </div>
            <div className="searchSection">
              <div>
                <BsSearch size={20} />
              </div>
              <form>
                <input
                  className="searchInput"
                  type="text"
                  placeholder="Rechercher une série, un film"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  ref={ref}
                />
              </form>
              <div>
                <IoMdClose
                  size={20}
                  onClick={handleSearchClose}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="navbar">
            <ul>
              <div className="title">
                <NavLink to="/">
                  <img src={betaseriesIcon} alt="logo betaseries" />
                </NavLink>
              </div>
              <div className="navbarIntern">
                <NavLink
                  to="/"
                  className={(nav) =>
                    nav.isActive ? "nav-active" : "nav-inactive"
                  }
                >
                  <li>
                    <AiFillHome
                      size={20}
                      style={{
                        width: "40px",
                      }}
                    />
                    <p className="mediaQuery">Accueil</p>
                  </li>
                </NavLink>
                <div className="navbar-dropdown">
                  <NavLink
                    to="/shows"
                    className={(nav) =>
                      nav.isActive ? "nav-active" : "nav-inactive"
                    }
                  >
                    <li>
                      <MdComputer
                        size={20}
                        style={{
                          width: "40px",
                        }}
                      />
                      <p className="mediaQuery">Séries</p>
                    </li>
                  </NavLink>
                  <div className="dropdown-content">
                    <NavLink to="/shows">Toutes les séries</NavLink>
                    <NavLink to="/my-shows">Mes séries</NavLink>
                    <NavLink to="/episodes">Episodes à voir</NavLink>
                    <NavLink to="/planning">Planning des sorties</NavLink>
                  </div>
                </div>
                <div className="navbar-dropdown">
                  <NavLink
                    to="/movies"
                    className={(nav) =>
                      nav.isActive ? "nav-active" : "nav-inactive"
                    }
                  >
                    <li>
                      <IoMdFilm
                        size={20}
                        style={{
                          width: "40px",
                        }}
                      />
                      <p className="mediaQuery">Films</p>
                    </li>
                  </NavLink>
                  <div className="dropdown-content">
                    <NavLink to="/movies">Tous les films</NavLink>
                    <NavLink to="/my-movies">Mes films</NavLink>
                  </div>
                </div>
              </div>
            </ul>
            <div className="connection">
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/signup">Inscription</NavLink>
              <div className="searchIcon">
                <BsSearch
                  size={20}
                  onClick={handleFocusOnSearch}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        )}
      </nav>
      {searchInput.length !== 0 ? (
        <div className="searchResultsContainer">
          <div
            className={
              nbpp === 10 ? "searchResultsInnerLong" : "searchResultsInner"
            }
          >
            <div className="resultsContainer">
              <div>
                <h2>Séries</h2>
                {searchResultShow.map((show) => (
                  <SearchShows key={show.id} show={show} />
                ))}
                <div className="moreResults">
                  <BiChevronDown />
                  <p onClick={() => setNbpp(10)}>
                    {nbpp === 10
                      ? "Plus de résultats sur l'annuaire"
                      : "Plus de résultats..."}
                  </p>
                </div>
              </div>
              <div>
                <h2>Films</h2>
                {searchResultMovie.map((movie) => (
                  <SearchMovies key={movie.id} movie={movie} />
                ))}
                <div className="moreResults">
                  <BiChevronDown />
                  <p onClick={() => setNbpp(10)}>
                    {nbpp === 10
                      ? "Plus de résultats sur l'annuaire"
                      : "Plus de résultats..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
