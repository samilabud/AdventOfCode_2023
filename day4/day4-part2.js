import fs from "fs";

const scratchcards = fs.readFileSync("./day4/input.txt", "utf-8").split("\n");

const lineData = scratchcards.map((line) => {
  const data = line.split(":");
  const cardId = Number(data[0].match(/\d+/g));

  const numbers = data[1].replace("  ", " ").split("|");
  const regExp = new RegExp(/\d+/, "g");
  const winningNumbers = numbers[0].match(regExp);
  const havingNumbers = numbers[1].match(regExp);
  return { cardId, winningNumbers, havingNumbers, instances: 1 };
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

const winnerData = getWinnerNumbers(lineData);

const cardInstances = [];
for (let i = 0; i < winnerData.length; i++) {
  const card = winnerData[i];
  for (let x = 0; x < card.instances; x++) {
    for (let y = 0; y < card.matches.length; y++) {
      if (winnerData[i + (y + 1)]) {
        winnerData[i + (y + 1)].instances++;
      }
    }
  }
  cardInstances.push(card);
}

const finalResult = cardInstances.reduce(
  (accumulator, currentValue) => accumulator + currentValue.instances,
  0
);
console.log(`Day 4 - Result of part 2 => ${finalResult}`);
