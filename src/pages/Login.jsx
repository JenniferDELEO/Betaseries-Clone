import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const md5 = require("md5");
  let navigate = useNavigate();
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [pseudoSignUp, setPseudoSignUp] = useState("");

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

  function handleSignUp(e) {
    e.preventDefault();
    axios
      .post(
        `https://api.betaseries.com/members/signup?key=${process.env.REACT_APP_KEY}`,
        {
          login: pseudoSignUp,
          password: md5(passwordSignUp),
          email: emailSignUp,
        }
      )
      .then((res) => console.log(res));
  }

  return (
    <div>
      <div>
        <h2>Connexion</h2>
        <form onSubmit={handleConnection}>
          <div>
            <label htmlFor="emailSignIn">Email :</label>
            <input
              type="email"
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
      <div>
        <h2>Créer un compte</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="pseudoSignUp">Pseudo :</label>
            <input
              type="text"
              id="pseudoSignUp"
              required
              value={pseudoSignUp}
              onChange={(e) => setPseudoSignUp(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="emailSignUp">Email :</label>
            <input
              type="email"
              id="emailSignUp"
              required
              value={emailSignUp}
              onChange={(e) => setEmailSignUp(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordSignUp">Mot de passe :</label>
            <input
              type="password"
              id="passwordSignUp"
              required
              value={passwordSignUp}
              onChange={(e) => setPasswordSignUp(e.target.value)}
            />
          </div>
          <button type="submit">Crée compte</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
