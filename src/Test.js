import "./App.css";
import React, { useState, useEffect } from "react";

function Test() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const createNumbersForCell = () => {
      return [...Array(15).keys()];
    }
    setArr(createNumbersForCell());
  }, []);

  const replace = (item) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
        setArr(prev => [...arr]);
      }
    }
  };

  return (
    <>
      {arr.map((item, index) => (
        <div key={index} onClick={() => {replace(item)}}>
          {item} {index} {console.log('test')}
        </div>
      ))}
    </>
  );
}

export default  Test ;
