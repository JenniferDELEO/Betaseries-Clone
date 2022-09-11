import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetail = () => {
  const params = useParams();
  const [showResult, setShowResult] = useState({});

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
          `https://api.betaseries.com/shows/display?key=${process.env.REACT_APP_KEY}&v=3.0&id=${params.id}`,
          config
        )
        .then((res) => res.data)
        .then((data) => setShowResult(data.show));
    }
    request();
  }, [params.id]);
  return (
    <div>
      <h1>{showResult.title}</h1>
    </div>
  );
};

export default ShowDetail;
