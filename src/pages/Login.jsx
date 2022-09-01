import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const md5 = require("md5");
  let navigate = useNavigate();
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  async function handleConnection(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          `https://api.betaseries.com/members/auth?key=${process.env.REACT_APP_KEY}`,
          {
            login: emailSignIn,
            password: md5(passwordSignIn),
          }
        )
        .then((res) => res.data)
        .then((data) => localStorage.setItem("token", data.token))
        .then(() => {
          setEmailSignIn("");
          setPasswordSignIn("");
        })
        .then(() => navigate("../", { replace: true }));
    } catch {
      navigate("../", { replace: true });
    }
  }

  return (
    <div>
      <div>
        <h2>Connexion</h2>
        <form onSubmit={handleConnection}>
          <div>
            <label htmlFor="emailSignIn">Email/Pseudo :</label>
            <input
              type="text"
              id="emailSignIn"
              required
              value={emailSignIn}
              onChange={(e) => setEmailSignIn(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordSignIn">Mot de passe :</label>
            <input
              type="password"
              id="passwordSignIn"
              required
              value={passwordSignIn}
              onChange={(e) => setPasswordSignIn(e.target.value)}
            />
          </div>
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
