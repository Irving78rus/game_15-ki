import "./App.css";
import React, { useState, useEffect } from "react";

const cellSize = 100;
function App({ items }) {
  const [emptyLeft, setEmptyLeft] = useState(300);
  const [emptyTop, setEmptyTop] = useState(300);
  const [time, setTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [itemsForRender, setItemsForRender] = useState([]);
  const [newGame, setNewGame] = useState(false);
  useEffect(() => {
    const numbers = [...Array(15).keys()]
      .map((key) => key + 1)
      .sort(() => Math.random() - 0.5);

    setItemsForRender(
      items.map((item) => {
        return {
          id: item.id,
          number: numbers[item.id],
          left: (item.id % 4) * cellSize,
          top: ((item.id - (item.id % 4)) / 4) * cellSize,
        };
      })
    );
  }, [newGame]);
  useEffect(() => {
    if (!isFinished) {
      setTimeout(() => setTime(time + 1), 1000);
      console.log(time);
    }
  }, [time]);

  useEffect(() => {
    setIsFinished(
      itemsForRender.every((cell) => {
        return cell.number === (cell.top * 4 + cell.left) / 100 + 1;
      })
    );
  }, [itemsForRender]);
  const Move = (item) => {
    if (
      Math.abs(item.left - emptyLeft) <= 100 &&
      Math.abs(item.top - emptyTop) <= 100 &&
      Math.abs(item.left + item.top - (emptyLeft + emptyTop)) === 100
    ) {
      setItemsForRender(
        itemsForRender.map((u) =>
          u.id === item.id ? { ...u, left: emptyLeft, top: emptyTop } : u
        )
      );
      setEmptyTop(item.top);
      setEmptyLeft(item.left);
    }
  };
  const again = () => {
    setIsFinished(!isFinished);
    setNewGame(!newGame);
  };
  return (
    <>
      {!isFinished && itemsForRender.length === 15 ? (
        <div className="App">
          {itemsForRender.map((item) => (
            <div
              className="cell"
              onClick={() => {
                Move(item);
              }}
              style={{ left: item.left, top: item.top }}
            >
              {item.number ? item.number : null}
            </div>
          ))}
          <div
            className="cell"
            style={{ left: emptyLeft, top: emptyTop }}
          ></div>
        </div>
      ) : (
        <div>
          {`isFinished you time ${time} sec`}
          <button onClick={again}>начать заново</button>
        </div>
      )}
    </>
  );
}

export default App;
