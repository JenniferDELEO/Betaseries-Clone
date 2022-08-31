import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const md5 = require("md5");
  let navigate = useNavigate();
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [pseudoSignUp, setPseudoSignUp] = useState("");

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
      .then((res) => console.log(res))
      .then(() => navigate("../Login", { replace: true }));
  }

  return (
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
        <button type="submit">Créer compte</button>
      </form>
    </div>
  );
};

export default SignUp;
