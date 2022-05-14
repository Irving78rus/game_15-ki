import "./App.css";
import React, { useContext, useEffect, useMemo } from "react";
import { Context } from "./context";
import { moveAuthorized, gameTime } from "./logic";
import uniqid from "uniqid";
const cellSize = 100;

function Game() {
  const {
   
  } = useContext(Context);
   
console.log(123);
  return (
    <>
      <h1>23423</h1>
    </>
  );
}

export default React.memo(Game);
