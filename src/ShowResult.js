import React from "react";
import { gameTime } from "./logik";
import "./App.css";
const ShowResult = ({ gameResult, gameId, isRecord }) => {
  return (
    <>
      <div className="hederResult">
        <div className="blockResult">Дата игры</div>
        <div className="blockResult">Очки</div>
        <div className="blockResult">Время игры</div>
      </div>
      {gameResult.sort((prev, next) => next.totalScore - prev.totalScore).map(item =>
        <div key={item.gameId} className="hederResult"
          style={item.gameId === gameId ? { fontWeight: "bold" } : null}>
          <div className="blockResult">{item.data}</div>
          <div className="blockResult">{item.totalScore}
            {isRecord && item.gameId === gameId
              && <div style={{ fontWeight: "bold", color: 'red', fontSize: '20px' }}>
                Ура! Это новый рекорд
              </div>}
          </div>
          <div className="blockResult" >
            {gameTime(item.time)}  </div>
        </div>)}
    </>
  );
};

export default ShowResult;
