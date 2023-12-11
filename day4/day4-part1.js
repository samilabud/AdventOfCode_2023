import fs from "fs";

const scratchcards = fs.readFileSync("./day4/input.txt", "utf-8").split("\n");

const lineData = scratchcards.map((line) => {
  const data = line.split(":");
  const cardId = Number(data[0].match(/\d+/g));

  const numbers = data[1].replace("  ", " ").split("|");
  const regExp = new RegExp(/\d+/, "g");
  const winningNumbers = numbers[0].match(regExp);
  const havingNumbers = numbers[1].match(regExp);
  return { cardId, winningNumbers, havingNumbers };
});

const getWinnerNumbers = (parsedData) => {
  const result = [];
  parsedData.forEach((line) => {
    const { winningNumbers, havingNumbers } = line;
    const matches = winningNumbers.filter((val) => havingNumbers.includes(val));
    result.push({ ...line, matches });
  });
  return result;
};

const getPoints = (dataWithMatches) => {
  const result = dataWithMatches.map((val) => {
    let points = 0;
    if (val.matches.length > 0) {
      if (val.matches.length > 1) {
        points = 1;
        val.matches.pop();
        val.matches.forEach((match) => {
          points += points;
        });
      } else {
        points = 1;
      }
    }
    return { ...val, points };
  });
  return result;
};

const getResult = (dataWithPoints) => {
  return dataWithPoints
    .map((data) => data.points)
    .reduce((accum, current) => accum + current, 0);
};

const winnerData = getWinnerNumbers(lineData);
const dataWithPoints = getPoints(winnerData);
const finalResult = getResult(dataWithPoints);

console.log(`Day 4 - Result of part 1 => ${finalResult}`);
