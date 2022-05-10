import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Context from "./context";
import { createNumbersForCell, setCell, startMove } from "./logic";
import Modal from "./Modal";
import ShowResult from "./ShowResult";
function Start() {
  const {
    setStageOfTheGame,
    setItemsForRender,
    itemsForRender,
    setCoordinateEmpty,
    coordinateEmpty,
    gameResult,
  } = useContext(Context);
  const [modalVisibileted, setmodalVisibileted] = useState(false);
  useEffect(() => {
    const numbers = createNumbersForCell();
    setItemsForRender(setCell(numbers));
    if (gameResult.length === 0) {
      localStorage.setItem("totalResult", JSON.stringify([]));
    }
  }, []);
  const start = () => {
    setStageOfTheGame(1);
    const obj = startMove(itemsForRender, coordinateEmpty);
    setItemsForRender(obj.itemsForRenderCopy);
    setCoordinateEmpty({
      CoordinateEmptyX: obj.coordinateEmpty.CoordinateEmptyX,
      CoordinateEmptyY: obj.coordinateEmpty.CoordinateEmptyY,
    });
  };

  return (
    <div
      onClick={
        modalVisibileted
          ? () => {
              setmodalVisibileted(false);
            }
          : null
      }
    >
      <div className="hello">
        Добро пожаловать в игру Пятнашки
        <div
          className="question"
          onClick={() => {
            setmodalVisibileted(!modalVisibileted);
          }}
        >
          ?{modalVisibileted && <Modal />}
        </div>
      </div>
      <button onClick={start}>Начать игру</button>
      {gameResult.length > 0 && <ShowResult gameResult={gameResult} />}
    </div>
  );
}

export default React.memo(Start);
