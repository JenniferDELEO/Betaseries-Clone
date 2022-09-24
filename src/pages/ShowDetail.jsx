import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const ShowDetail = () => {
  const { id } = useParams();
  const [showResult, setShowResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    setIsLoading(true);
    const request = async () => {
      try {
        await axios
          .get(
            `https://api.betaseries.com/shows/display?key=${process.env.REACT_APP_KEY}&v=3.0&id=${id}`,
            config
          )
          .then((res) => res.data)
          .then((data) => {
            setShowResult(data.show);
            setIsLoading(false);
            console.log(showResult);
          });
      } catch (err) {
        console.log("error", err);
      }
    };
    request();
  }, [id]);

  if (isLoading) {
    return (
      <div className="showDetail">
        <Loading />
      </div>
    );
  } else {
    return (
      <div
        className="showDetail"
        style={{
          height: "100vh",
          backgroundImage: showResult.images
            ? `url(${showResult.images.show})`
            : "",
          filter: "blur(50px)",
        }}
      >
        <h1>{showResult.title}</h1>
      </div>
    );
  }
};

export default ShowDetail;
