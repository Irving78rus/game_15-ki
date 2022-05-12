import "./App.css";
import React from "react";
import Start from "./Start";
import Game from "./Game";
import GameResult from "./GameResult";
import Timer from "./Timer";
import {Context,ContextTime} from "./context";
import { useState, useMemo } from "react";

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
  const [isRecord, setIsRecord] = useState(false);
  return (
    <Context.Provider
      value={{
        isRecord,
        setIsRecord,
        coordinateEmpty,
        setCoordinateEmpty,
        stageOfTheGame,
        setStageOfTheGame,
        itemsForRender,
        setItemsForRender,
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
        {useMemo(
          () => stageOfTheGame === 1 && 
          <div>
            {console.log('app')} <Game />
          </div>,
          [coordinateEmpty, stageOfTheGame, itemsForRender,moveCount]
        )}
        {stageOfTheGame === 0 && <Start />}
        <ContextTime.Provider
      value={{
        time,
        setTime,
      }}>
        {stageOfTheGame === 2 && <GameResult />}
        {stageOfTheGame === 1 && <Timer />}
        </ContextTime.Provider> 
      </div>
      
    </Context.Provider>
  );
}

export default React.memo(App);
