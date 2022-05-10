import "./App.css";
import React, { useContext, useEffect } from "react";
import Context from './context'
import {
   totalyCount
} from "./logik";
 
function Timer() {
   const { time, setTime, setTotalScore, moveCount } = useContext(Context)

   useEffect(() => {
     const gameTime= setInterval(() => setTime(prev=>prev + 1), 1000);
       return ()=>{
          clearInterval(gameTime)
       }
   }, [ ])
   useEffect(() => {
      
      setTotalScore(totalyCount(moveCount, time));
   }, [time])


   return (
      <>

      </>
   )
}

export default React.memo(Timer);
