import fs from "fs";

const engine = fs.readFileSync("./day3/input.txt", "utf-8").split("\n");

const matriz = engine.map((line) => line.split(""));

const getNumbersOfPositions = (matriz) => {
  const numbersPositions = {};

  matriz.forEach((row, rowIdx) => {
    let tempNum = "";
    let tempPos = [];
    let tempRowIdx = null;
    row.forEach((val, idx) => {
      if (isNaN(val)) {
        if (tempNum !== "") {
          numbersPositions[`${tempNum}-${rowIdx}${idx}`] = {
            row: rowIdx,
            positions: tempPos,
          };
          tempNum = "";
          tempPos = [];
        }
      } else {
        tempNum += val;
        tempPos.push(idx);
        //if is the last element
        if (idx === matriz.length - 1 && tempNum !== "") {
          numbersPositions[`${tempNum}-${rowIdx}${idx}`] = {
            row: rowIdx,
            positions: tempPos,
          };
          tempNum = "";
          tempPos = [];
        }
      }
    });

    tempRowIdx = rowIdx;
  });

  return numbersPositions;
};

const numbersPositions = getNumbersOfPositions(matriz);
console.log(numbersPositions);
const getAroundValues = (matriz, row, col) => {
  const leftPos = matriz[row][col - 1];
  const topPos = matriz[row - 1] ? matriz[row - 1][col] : false;
  const currentPos = matriz[row][col];
  const rightPos = matriz[row][col + 1];
  const bottomPos = matriz[row + 1] ? matriz[row + 1][col] : false;
  const topLeftDiagonal = topPos && leftPos ? matriz[row - 1][col - 1] : false;
  const bottomLeftDiagonal =
    bottomPos && leftPos ? matriz[row + 1][col - 1] : false;
  const topRightDiagonal =
    topPos && rightPos ? matriz[row - 1][col + 1] : false;
  const bottomRightDiagonal =
    bottomPos && rightPos ? matriz[row + 1][col + 1] : false;

  const aroundValues = {
    currentPos,
    leftPos,
    topLeftDiagonal,
    topPos,
    topRightDiagonal,
    rightPos,
    bottomRightDiagonal,
    bottomPos,
    bottomLeftDiagonal,
  };
  return aroundValues;
};

const gotASymbolAround = (aroundValues) => {
  const symbolRegExp = new RegExp(/[\d|.]/);
  const hasSymbol =
    Object.keys(aroundValues).filter((pos) => {
      if (!aroundValues[pos]) return false;
      return !aroundValues[pos].match(symbolRegExp);
    }).length > 0;
  return hasSymbol;
};

const getValidNumbers = (numbersPositions, matriz) => {
  const validNumbers = [];
  for (let number in numbersPositions) {
    const numberPositions = numbersPositions[number];
    const row = numberPositions.row;
    const positions = numberPositions.positions;
    const numberHasSymbol = positions.some((pos) => {
      const aroundValues = getAroundValues(matriz, row, pos);
      return gotASymbolAround(aroundValues);
    });
    if (numberHasSymbol) {
      validNumbers.push(number);
    }
  }
  return validNumbers;
};

const getResult = (validNumbers) => {
  return validNumbers
    .map((num) => Number(num.split("-")[0]))
    .reduce((accum, current) => accum + current, 0);
};

const validNumbers = getValidNumbers(numbersPositions, matriz);
// console.table(validNumbers);
const result = getResult(validNumbers);
console.log(result);
//535078
