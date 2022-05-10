import "./App.css";
import React, { useContext, useEffect } from "react";
import Context from "./context";
import { moveAuthorized, gameTime } from "./logik";
import uniqid from "uniqid";
const cellSize = 100;

function Game() {
    const {
        totalScore,
        itemsForRender,
        setStageOfTheGame,
        time,
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
            setMoveCount((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (
            itemsForRender.every((cell) => {
                return cell.number === cell.top * 4 + cell.left + 1;
            }) && itemsForRender.length === 15
        ) {
            setStageOfTheGame(2);
        }
    }, [itemsForRender]);
    const capitulate = () => {
        setTotalScore(0);
        setStageOfTheGame(2);
    };
    return (
        <>
            <button onClick={capitulate}>Признаю поражение</button>
            <div className="App">
                {itemsForRender.map((item) => (
                    <div
                        key={item.id}
                        className="cell"
                        onClick={() => {
                            Move(item);
                        }}
                        style={
                            moveAuthorized(item, coordinateEmpty)
                                ? {
                                    left: item.left * cellSize,
                                    top: item.top * cellSize,
                                    border: "3px solid rgba(253, 0, 0, 0.44)",
                                }
                                : {
                                    left: item.left * cellSize,
                                    top: item.top * cellSize,
                                }
                        }
                    >
                        <div className="circle"> {item.number ? item.number : null} </div>
                    </div>
                ))}
                <div
                    className="cell empty"
                    style={{
                        left: coordinateEmpty.CoordinateEmptyX * cellSize,
                        top: coordinateEmpty.CoordinateEmptyY * cellSize,
                    }}
                ></div>
            </div>
            Time {gameTime(time)}
            <div>Score {totalScore}</div>
        </>
    );
}

export default React.memo(Game);
