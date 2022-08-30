import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import { IoMdFilm } from "react-icons/io";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <NavLink to="/">
            <li>betaseries</li>
          </NavLink>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "nav-inactive")}
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
          <NavLink
            to="/shows"
            className={(nav) => (nav.isActive ? "nav-active" : "nav-inactive")}
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
          <NavLink
            to="/movies"
            className={(nav) => (nav.isActive ? "nav-active" : "nav-inactive")}
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
        </ul>
      </nav>
    </div>
  );
};

export default Header;
