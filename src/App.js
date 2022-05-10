import "./App.css";
import React from "react";
import Start from "./Start";
import Game from "./Game";
import GameResult from "./GameResult";
import Timer from "./Timer";
import Context from "./context";
import { useState } from "react";

function App() {
  const [coordinateEmpty, setCoordinateEmpty] = useState({
    CoordinateEmptyX: 3,
    CoordinateEmptyY: 3,
  });
  const [stageOfTheGame, setStageOfTheGame] = useState(0);
  const [itemsForRender, setItemsForRender] = useState([]);
  const [time, setTime] = useState(0);
  const [gameId, setGameId] = useState("0");
  const [moveCount, setMoveCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameResult, setGameResult] = useState(
    JSON.parse(localStorage.getItem("totalResult")) || []
  );
  return (
    <Context.Provider
      value={{
        coordinateEmpty,
        setCoordinateEmpty,
        stageOfTheGame,
        setStageOfTheGame,
        itemsForRender,
        setItemsForRender,
        time,
        setTime,
        moveCount,
        setMoveCount,
        totalScore,
        setTotalScore,
        gameResult,
        setGameResult,
        gameId,
        setGameId,
      }}
    >
      <div>
        {stageOfTheGame === 0 && <Start />}
        {stageOfTheGame === 1 && <Game />}
        {stageOfTheGame === 2 && <GameResult />}
        {stageOfTheGame === 1 && <Timer />}
      </div>
    </Context.Provider>
  );
}

export default React.memo(App);
