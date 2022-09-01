import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import { IoMdFilm } from "react-icons/io";

const Header = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    navigate("../", { replace: true });
  };

  return (
    <div className="header">
      <nav>
        {token ? (
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
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
