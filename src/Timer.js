import "./App.css";
import React, { useContext, useEffect } from "react";
import { Context, ContextTime } from "./context";
import { totalCount, gameTime } from "./logic";

function Timer() {
  const { setTotalScore, moveCount, totalScore } = useContext(Context);
  const { time, setTime } = useContext(ContextTime);

  useEffect(() => {
    const gameTime = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => {
      clearInterval(gameTime);
    };
  }, []);
  useEffect(() => {
    setTotalScore(totalCount(moveCount, time));
  }, [ moveCount,time]);

  return (
    <>
      Time {gameTime(time)}
      <div>Score {totalScore}</div>
    </>
  );
}

export default React.memo(Timer);
