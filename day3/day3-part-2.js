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

  const fillPosObj = (val, row, col) => ({ val, row, col });
  const aroundValues = {
    currentPos: fillPosObj(currentPos, row, col),
    leftPos: fillPosObj(leftPos, row, col - 1),
    topLeftDiagonal: fillPosObj(topLeftDiagonal, row - 1, col - 1),
    topPos: fillPosObj(topPos, row - 1, col),
    topRightDiagonal: fillPosObj(topRightDiagonal, row - 1, col + 1),
    rightPos: fillPosObj(rightPos, row, col + 1),
    bottomRightDiagonal: fillPosObj(bottomRightDiagonal, row + 1, col + 1),
    bottomPos: fillPosObj(bottomPos, row + 1, col),
    bottomLeftDiagonal: fillPosObj(bottomLeftDiagonal, row + 1, col - 1),
  };
  return aroundValues;
};

const getAroundSymbols = (aroundValues) => {
  const symbolRegExp = new RegExp(/\*/);
  const symbolsAround = Object.keys(aroundValues).filter((pos) => {
    if (!aroundValues[pos].val) return false;
    // console.log(aroundValues[pos]);
    return aroundValues[pos].val.match(symbolRegExp);
  });
  if (symbolsAround.length > 0) {
    const values = aroundValues[symbolsAround[0]];
    const getAroundSymbol = `${values.val}-${values.row}-${values.col}`;
    return getAroundSymbol;
  } else {
    return "";
  }
};

// console.log({ numbersPositions });
// const aroundValues = getAroundValues(matriz, 0, 1);
// console.log({ aroundValues });

const getValidNumbers = (numbersPositions, matriz) => {
  const validNumbers = {};
  for (let number in numbersPositions) {
    const numberPositions = numbersPositions[number];
    const row = numberPositions.row;
    const positions = numberPositions.positions;
    positions.forEach((pos) => {
      const aroundValues = getAroundValues(matriz, row, pos);
      const symbolAround = getAroundSymbols(aroundValues);
      if (symbolAround) {
        // console.log(symbolAround, number, validNumbers[symbolAround]);
        if (validNumbers[symbolAround]) {
          if (!validNumbers[symbolAround].includes(number)) {
            validNumbers[symbolAround].push(number);
          }
        } else {
          validNumbers[symbolAround] = [number];
        }
      }
    });
  }
  return validNumbers;
};

const getResult = (validNumbers) => {
  let result = 0;
  Object.keys(validNumbers).forEach((gear) => {
    const valuesOfGear = validNumbers[gear];
    if (valuesOfGear.length > 1) {
      //valid gear
      const powerOfGear = valuesOfGear
        .map((power) => Number(power.split("-")[0]))
        .reduce((accum, current) => accum * current);
      // console.log(powerOfGear, valuesOfGear);
      result += powerOfGear;
    }
  });
  return result;
};

const validNumbers = getValidNumbers(numbersPositions, matriz);
// console.log(validNumbers);

const result = getResult(validNumbers);

console.log(`Day 3 - Result of part 2 => ${result}`);
