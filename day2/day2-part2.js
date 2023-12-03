import fs from "fs";

const games = fs.readFileSync("./day2/input.txt", "utf-8").split("\n");

const gameMetaData = games.map((value) => value.split(":"));

const gameData = {};

const getFewestNumberOfCubes = (record) => {
  const blocks = record.split(";");
  const blockObject = {};
  blocks.forEach((block) => {
    const colorsAndQuantity = block.split(",");
    colorsAndQuantity.forEach((colorAndQuantity) => {
      const color = colorAndQuantity.match(/[a-z]+/gi)[0];
      const quantity = Number(colorAndQuantity.match(/\d+/g));
      if (blockObject[color]) {
        blockObject[color] = Math.max(quantity, blockObject[color]);
      } else {
        blockObject[color] = quantity;
      }
    });
  });
  return blockObject;
};

let sumResult = 0;
gameMetaData.forEach((element) => {
  const gameId = element[0].match(/\d+/);
  const fewestCubes = getFewestNumberOfCubes(element[1]);
  const powerOfGame = Object.keys(fewestCubes)
    .map((val) => fewestCubes[val])
    .reduce((accum, current) => accum * current);
  sumResult += powerOfGame;
});

console.log(`Day 2 - Result of part 2 => ${sumResult}`);
