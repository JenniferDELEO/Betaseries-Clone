import React from "react";
import styled from "styled-components";

const Screen = styled.div`
  position: relative;
  height: 50vh;
  width: 100%;
  opacity: 0;
  animation: fade 0.4s ease-in forwards;

  @keyframes fade {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Balls = styled.div`
  border: 3px solid hsla(197, 100%, 62%, 0.2);
  border-top-color: #3b8dd0;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 1s linear infinite;
  margin: auto
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`;

const Loading = () => {
  return (
    <>
      <Screen>
        <Balls></Balls>
      </Screen>
    </>
  );
};

export default Loading;
