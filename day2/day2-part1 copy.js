import fs from "fs";

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

const games = fs.readFileSync("./day2/input.txt", "utf-8").split("\n");

const gameMetaData = games.map((value) => value.split(":"));

const gameData = {};

const groupGameRecord = (record) => {
  const resultObject = {};
  const blocks = record.split(";");
  blocks.forEach((block) => {
    const colorsAndQuantity = block.split(",");
    colorsAndQuantity.forEach((colorAndQuantity) => {
      const color = colorAndQuantity.match(/[a-z]+/gi)[0];
      const quantity = Number(colorAndQuantity.match(/\d+/g));
      if (resultObject[color]) {
        resultObject[color] += quantity;
      } else {
        resultObject[color] = quantity;
      }
    });
  });
  return resultObject;
};

gameMetaData.forEach((element) => {
  const gameId = element[0].match(/\d+/);
  gameData[gameId] = groupGameRecord(element[1]);
});

// console.log(gameData);

//Game 61: 4 red, 4 red; 5 red,  5 red,   8 red, 8 red,  = 34
//18 blue,3 blue;3 blue,7 blue;4 blue, 14 blue = 49
//13 green; 9 green,  4 green,4 green,  6 green; 10 green, = 46

const resultsIds = [];

// Object.keys(gameData).forEach((gameId) => {
//   const gameInfo = gameData[gameId];
//   if (
//     gameInfo.blue <= maxBlueCubes &&
//     gameInfo.red <= maxRedCubes &&
//     gameInfo.green <= maxGreenCubes
//   ) {
//     resultsIds.push(Number(gameId));
//   } else {
//     console.log(gameInfo);
//   }
// });

// const sumResult = resultsIds.reduce((accum, current) => accum + current, 0);
// console.log(`Result of sum game's ids => ${sumResult}`);
