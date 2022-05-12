import "./App.css";
import React, { useContext, useEffect } from "react";
import { Context, ContextTime } from "./context";
import { useStartGame } from "./hooks";
import ShowResult from "./ShowResult";
function GameResult() {
  const {
    totalScore,
    gameResult,
    setGameResult,
    gameId,
    isRecord,
    setIsRecord,
  } = useContext(Context);
  const { time } = useContext(ContextTime);
  useEffect(() => {
    setIsRecord(false);
    let data = new Date().toLocaleDateString();
    let totalResult = { time, totalScore, gameId, data };
    let totalResultForRender = JSON.parse(localStorage.getItem("totalResult"));

    totalResultForRender.every((item) => {
      return totalResult.totalScore > item.totalScore;
    }) && setIsRecord(true);

    totalResultForRender.push(totalResult);
    setGameResult(totalResultForRender);
    localStorage.setItem("totalResult", JSON.stringify(totalResultForRender));
  }, []);
  const restartGame = useStartGame();

  return (
    <>
      <button onClick={restartGame.restartGame}>restartGame</button>
      {gameResult.length > 0 && (
        <ShowResult
          gameResult={gameResult}
          isRecord={isRecord}
          gameId={gameId}
        />
      )}
    </>
  );
}

export default React.memo(GameResult);
