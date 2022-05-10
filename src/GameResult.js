import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Context from "./context";
import { startMove } from "./logic";

import ShowResult from "./ShowResult";
function GameResult() {
  const {
    time,
    setMoveCount,
    totalScore,
    setTotalScore,
    setStageOfTheGame,
    setTime,
    itemsForRender,
    setItemsForRender,
    setCoordinateEmpty,
    coordinateEmpty,
    gameResult,
    setGameResult,
    gameId,
  } = useContext(Context);
  const [isRecord, setIsRecord] = useState(false);
  useEffect(() => {
    setIsRecord(false);
    let data = new Date().toLocaleDateString();
    let totalResult = { time, totalScore, gameId, data };
    let totalResultForRender = JSON.parse(localStorage.getItem("totalResult"));
    totalResultForRender.forEach(
      (item) => totalResult.totalScore > item.totalScore && setIsRecord(true)
    );
    totalResultForRender.push(totalResult);
    setGameResult(totalResultForRender);
    localStorage.setItem("totalResult", JSON.stringify(totalResultForRender));
  }, []);
  const restartGame = () => {
    setTime(0);
    setTotalScore(0);
    setMoveCount(0);
    setStageOfTheGame(1);
    const obj = startMove(itemsForRender, coordinateEmpty);
    setItemsForRender(obj.itemsForRenderCopy);
    setCoordinateEmpty({
      CoordinateEmptyX: obj.coordinateEmpty.CoordinateEmptyX,
      CoordinateEmptyY: obj.coordinateEmpty.CoordinateEmptyY,
    });
  };

  return (
    <>
      <button onClick={restartGame}>restartGame</button>
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
