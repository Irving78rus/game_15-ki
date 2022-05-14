import { startMove } from "./logic";
import { useContext } from "react";
import {Context } from "./context";

export const useStartGame = () => {
  const {
    setIsRecord,
    setStageOfTheGame,
    setItemsForRender,
    itemsForRender,
    setCoordinateEmpty,
    coordinateEmpty,
    setTotalScore,
    setMoveCount,
    setTime 
  } = useContext(Context);
  
  let a = {
    start: () => {
      const obj = startMove(itemsForRender, coordinateEmpty);
      setItemsForRender(obj.itemsForRender);
      setStageOfTheGame(1);
      setCoordinateEmpty({
        CoordinateEmptyX: obj.coordinateEmpty.CoordinateEmptyX,
        CoordinateEmptyY: obj.coordinateEmpty.CoordinateEmptyY,
      });
    },
    restartGame: () => {
      a.start();
      setTime(0);
      setTotalScore(0);
      setMoveCount(0);
      setIsRecord(false);
    },
  };

  return a;
};
