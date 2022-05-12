import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import {Context} from "./context";
import { createNumbersForCell, setCell } from "./logic";
import Modal from "./Modal";
import ShowResult from "./ShowResult";
import { useStartGame } from "./hooks";
 
function Start() {
  const {
    setItemsForRender,
    gameResult,
  } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const numbers = createNumbersForCell();
    setItemsForRender(setCell(numbers));
    if (gameResult.length === 0) {
      localStorage.setItem("totalResult", JSON.stringify([]));
    }
  }, []);

  const start = useStartGame();

  return (
    <div
      onClick={
        modalVisible
          ? () => {
            setModalVisible(false);
            }
          : null
      }
    >
      <div className="hello">
        Добро пожаловать в игру Пятнашки
        <div
          className="question"
          onClick={() => {
            setModalVisible(!modalVisible);
          }}
        >
          ?{modalVisible && <Modal />}
        </div>
      </div>
      <button onClick={start.start}>Начать игру</button>
      {gameResult.length > 0 && <ShowResult gameResult={gameResult} />}
    </div>
  );
}

export default React.memo(Start);
