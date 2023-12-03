import fs from "fs";

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

const maxObject = {
  blue: maxBlueCubes,
  red: maxRedCubes,
  green: maxGreenCubes,
};

const games = fs.readFileSync("./day2/input.txt", "utf-8").split("\n");

const gameMetaData = games.map((value) => value.split(":"));

const gameData = {};

const resultsIds = {};

const groupGameRecord = (gameId, record) => {
  const blocks = record.split(";");

  const isValidAllBlocks = blocks.every((block) => {
    const colorsAndQuantity = block.split(",");

    const isValidBlock = colorsAndQuantity.every((colorAndQuantity) => {
      const color = colorAndQuantity.match(/[a-z]+/gi)[0];
      const quantity = Number(colorAndQuantity.match(/\d+/g));

      if (quantity <= maxObject[color]) {
        return true;
      }
      return false;
    });
    return isValidBlock;
  });

  resultsIds[gameId] = isValidAllBlocks;
};

gameMetaData.forEach((element) => {
  const gameId = Number(element[0].match(/\d+/));
  groupGameRecord(gameId, element[1]);
});

const sumResult = Object.keys(resultsIds)
  .map((val) => (resultsIds[val] ? Number(val) : 0))
  .reduce((accum, current) => accum + current, 0);
console.log(`Day 2 - Result of part 1 => ${sumResult}`);
