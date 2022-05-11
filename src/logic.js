export const createNumbersForCell = () => {
  return [...Array(15).keys()];
};

export const setCell = (startCell) => {
  return startCell.map((item) => {
    return {
      id: item,
      number: startCell[item] + 1,
      left: item % 4,
      top: (item - (item % 4)) / 4,
    };
  });
};
export const getRandomElement = (arr) => {
  let randItemIndex = Math.floor(Math.random() * arr.length);
  let randItem = arr[randItemIndex];
  return randItem;
};

export const startMove = (itemsForRender, coordinateEmpty) => {
  let itemsForRenderCopy = [...itemsForRender];
  for (let i = 0; i < 150; i++) {
    // debugger
    let itemsWithMoveAuthorized = itemsForRenderCopy.filter((item) =>
      moveAuthorized(item, coordinateEmpty)
    );
    let randItem = getRandomElement(itemsWithMoveAuthorized);
    itemsForRenderCopy = [...itemsForRenderCopy].map((item) =>
      item !== randItem
        ? item
        : {
            ...item,
            left: coordinateEmpty.CoordinateEmptyX,
            top: coordinateEmpty.CoordinateEmptyY,
          }
    );

    coordinateEmpty = {
      CoordinateEmptyX: randItem.left,
      CoordinateEmptyY: randItem.top,
    };
  }
  return { itemsForRenderCopy, coordinateEmpty };
};

export const moveAuthorized = (
  item,
  { CoordinateEmptyX, CoordinateEmptyY }
) => {
  return (
    Math.abs(item.left - CoordinateEmptyX) <= 1 &&
    Math.abs(item.top - CoordinateEmptyY) <= 1 &&
    Math.abs(item.left + item.top - (CoordinateEmptyX + CoordinateEmptyY)) === 1
  );
};

export const gameTime = (timeInSecond) => {
  let hours = Math.floor(timeInSecond / 60 / 60);
  let minutes = Math.floor(timeInSecond / 60) - hours * 60;
  let seconds = timeInSecond % 60;
  return `${hours < 10 ? "0" + hours : hours}  :  ${
    minutes < 10 ? "0" + minutes : minutes
  }  : ${seconds < 10 ? "0" + seconds : seconds}`;
};

let maxPoint = 1000;
export const totalyCount = (count, timeInSecond) => {
  let result = maxPoint - count * 5 - timeInSecond;
  if (result <= 0) {
    result=0
    return result;
  }
  return result;
};
