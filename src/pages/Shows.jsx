import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Shows = () => {
  const [showResults, setShowResults] = useState([]);

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
          `https://api.betaseries.com/shows/list?key=${process.env.REACT_APP_KEY}&order=popularity`,
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
    <>
      <h1>Annuaire des séries</h1>
      {showResults.map((show) => (
        <Card result={show} key={show.id} />
      ))}
    </>
  );
};

export default Shows;
