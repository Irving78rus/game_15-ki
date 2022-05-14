import "./App.css";
import React, { useContext, useEffect, useMemo } from "react";
import { Context } from "./context";
import { moveAuthorized } from "./logic";
import uniqid from "uniqid";
const cellSize = 100;

function Game() {
  const {
    itemsForRender,
    setStageOfTheGame,
    setItemsForRender,
    setMoveCount,
    setTotalScore,
    setGameId,
    coordinateEmpty,
    setCoordinateEmpty,
  } = useContext(Context);
  useEffect(() => {
    setGameId(uniqid());
  }, []);
  const Move = (item) => {
  
    if (moveAuthorized(item, coordinateEmpty)) {
      setItemsForRender((prev) =>
        prev.map((cell) =>
          cell.id === item.id
            ? {
                ...cell,
                left: coordinateEmpty.CoordinateEmptyX,
                top: coordinateEmpty.CoordinateEmptyY,
              }
            : cell
        )
      );
      setCoordinateEmpty({
        CoordinateEmptyX: item.left,
        CoordinateEmptyY: item.top,
      });

      setMoveCount((prev) => {
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    if (
      itemsForRender.every((cell) => {
        return cell.number === cell.top * 4 + cell.left + 1;
      }) &&
      itemsForRender.length === 15
    ) {
      setStageOfTheGame(2);
    }
  }, [itemsForRender]);
  const capitulate = () => {
    setTotalScore(0);
    setStageOfTheGame(2);
  };

  const createCell = (item) => {
    return (
      <div
        key={item.id}
        className="cell"
        onClick={() => {
          Move(item);
        }}
        style={{
          left: item.left * cellSize,
          top: item.top * cellSize,
        }}
      >
        <div
          className={
            moveAuthorized(item, coordinateEmpty)
              ? "circle circleBorder"
              : "circle"
          }
        >
          {item.number ? item.number : null}
        </div>
      </div>
    );
  };

  return (
    <>
      {useMemo(
        () => (
          <div>
            <button onClick={capitulate}>Признаю поражение</button>
            <div className="App">
              {itemsForRender.map((item) => createCell(item))}
              <div
                className="cell empty"
                style={{
                  left: coordinateEmpty.CoordinateEmptyX * cellSize,
                  top: coordinateEmpty.CoordinateEmptyY * cellSize,
                }}
              ></div>
            </div>
          </div>
        ),
        [itemsForRender, coordinateEmpty]
      )}
    </>
  );
}

export default React.memo(Game);
