import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import { IoMdFilm, IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

const Header = () => {
  let navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResultShow, setSearchResultShow] = useState([]);
  const [searchResultMovie, setSearchResultMovie] = useState([]);
  const [showId, setShowId] = useState("");
  const [movieId, setMovieId] = useState("");

  const token = localStorage.getItem("token");

  axios
    .get(
      `https://api.betaseries.com/search/all?key=${process.env.REACT_APP_KEY}&query=${searchInput}&limit=12`
    )
    .then((res) => {
      setSearchResultShow(res.data.shows);
      setSearchResultMovie(res.data.movies);
    });

  axios
    .get(
      `https://api.betaseries.com/shows/display?key=${process.env.REACT_APP_KEY}&id=${showId}`
    )
    .then((res) => res.data)
    .then((data) => {});

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    navigate("../", { replace: true });
  };

  return (
    <div className="header">
      <nav>
        {token ? (
          search ? (
            <div className="searchContainer">
              <div className="title">
                <NavLink to="/">
                  <li>betaseries</li>
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
                  />
                </form>
                <div>
                  <IoMdClose
                    size={20}
                    onClick={() => setSearch(!search)}
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
                    <li>betaseries</li>
                  </NavLink>
                </div>
                <div className="navbar">
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
                      <p>Accueil</p>
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
                        <p>Séries</p>
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
                        <p>Films</p>
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
                <NavLink to="/profil">Profil</NavLink>
                <NavLink to="/" onClick={() => handleLogOut()}>
                  Se déconnecter
                </NavLink>
                <div className="searchIcon">
                  <BsSearch
                    size={20}
                    onClick={() => setSearch(!search)}
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
                <li>betaseries</li>
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
                />
              </form>
              <div>
                <IoMdClose
                  size={20}
                  onClick={() => setSearch(!search)}
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
                  <li>betaseries</li>
                </NavLink>
              </div>
              <div className="navbar">
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
                    <p>Accueil</p>
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
                      <p>Séries</p>
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
                      <p>Films</p>
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
                  onClick={() => setSearch(!search)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        )}
      </nav>
      {searchInput.length !== 0 ? (
        <div className="searchResultsContainer">
          <div className="searchResultsInner">
            {/* {searchResultShow.map((show) => (
            <SearchShows key={show.id} show={show} />
          ))}
          {searchResultMovie.map((movie) => (
            <SearchMovies key={movie.id} movie={movie} />
          ))} */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
