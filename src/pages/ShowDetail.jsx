import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import RatingStar from "../components/RatingStar";

const ShowDetail = () => {
  const { id } = useParams();
  const [showResult, setShowResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);

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
            console.log(data.show);
          });
      } catch (err) {
        console.log("error", err);
      }
    };

    request();
    const duration = parseInt(showResult.length);
    const totalNumberOfEpisodes = parseInt(showResult.episodes);
    setTotalDuration(duration * totalNumberOfEpisodes);
  }, [id, showResult.length, showResult.episodes]);

  const totalDurationTranform = (number) => {
    let hours = number / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + " heures et " + rminutes + " minutes";
  };

  if (isLoading) {
    return (
      <div className="showDetail">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="showDetail">
        <div
          className="bg"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
            margin: 0,
            backgroundImage: showResult.images
              ? `url(${showResult.images.show})`
              : "",
            backgroundColor:
              showResult.images && showResult.images.show ? "" : "black",
            filter: "blur(30px)",
            zIndex: -1,
          }}
        ></div>
        <div className="showContent">
          <div className="infos-container">
            <div className="infos-box">
              {showResult.country && (
                <>
                  <p className="title-infos">PAYS</p>
                  <p className="text-infos">{showResult.country}</p>
                </>
              )}
            </div>
            {showResult.genres && (
              <div className="infos-box">
                <p className="title-infos">GENRES</p>
                <p className="text-infos">
                  {Object.values(showResult.genres).join(", ")}
                </p>
              </div>
            )}
            <div className="infos-box">
              {showResult.length && (
                <>
                  <p className="title-infos">DURÉE D'UN ÉPISODE</p>
                  <p className="text-infos">{showResult.length} minutes</p>
                </>
              )}
            </div>
            <div className="infos-box">
              {showResult.country && (
                <>
                  <p className="title-infos">DURÉE TOTALE</p>
                  <p className="text-infos">
                    {totalDurationTranform(totalDuration)}
                  </p>
                </>
              )}
            </div>
            <div className="infos-box">
              {showResult.status && (
                <>
                  <p className="title-infos">STATUT</p>
                  <p className="text-infos">
                    {showResult.status === "Ended"
                      ? "Terminée"
                      : showResult.status === "Continuing"
                      ? "En cours"
                      : ""}
                  </p>
                </>
              )}
            </div>
            <div className="infos-box">
              {showResult.network && (
                <>
                  <p className="title-infos">CHAÎNE</p>
                  <p className="text-infos">{showResult.network}</p>
                </>
              )}
            </div>
            <div className="infos-box">
              {showResult.showrunner && showResult.showrunner.name && (
                <>
                  <p className="title-infos">SHOWRUNNER</p>
                  <p className="text-infos">{showResult.showrunner.name}</p>
                </>
              )}
            </div>
          </div>
          <div className="show-middle">
            <div className="links">
              <p>Accueil→</p>
              <p>Séries→</p>
              {showResult.network && <p>{showResult.network}→</p>}
              {showResult.title && <p>{showResult.title}</p>}
            </div>
            {showResult.title && <h1>{showResult.title}</h1>}
            <div className="ratingYearFollowers">
              <div className="ratingStar">
                <RatingStar
                  rate={
                    showResult.notes && showResult.notes.mean
                      ? parseInt(showResult.notes.mean)
                      : 0
                  }
                  key={showResult.id}
                />
              </div>
              {showResult.creation && <p>{showResult.creation}</p>}
              {showResult.followers && (
                <p>
                  {parseInt(showResult.followers) > 10000
                    ? showResult.followers.slice(0, 2) + " K membres"
                    : parseInt(showResult.followers) > 1000
                    ? showResult.followers.slice(0, 1) + " K membres"
                    : parseInt(showResult.followers) > 1
                    ? showResult.followers + " membres"
                    : showResult.followers + " membre"}
                </p>
              )}
              {showResult.seasons && (
                <p>
                  {parseInt(showResult.seasons) > 1
                    ? showResult.seasons + " saisons"
                    : parseInt(showResult.seasons) === 1
                    ? showResult.seasons + " saison"
                    : ""}
                </p>
              )}
              {showResult.episodes && (
                <p>
                  {parseInt(showResult.episodes) > 1
                    ? showResult.episodes + " épisodes"
                    : parseInt(showResult.episodes) === 1
                    ? showResult.episodes + " épisode"
                    : ""}
                </p>
              )}
            </div>
            {showResult.description && showResult.description}
          </div>
        </div>
      </div>
    );
  }
};

export default ShowDetail;
