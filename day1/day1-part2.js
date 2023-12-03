import fs from "fs";
let textResult = fs.readFileSync("./day1/input.txt", "utf-8");

const letterToNumberObj = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const calibrations = textResult.split("\n");

const letterExp = Object.keys(letterToNumberObj).join("|");
const digitsRegex = new RegExp("\\d|" + letterExp, "g");

const getDigit = (digit) => letterToNumberObj[digit] ?? Number(digit);
const digits = calibrations.map((value) => {
  if (!value) return 0;
  const matches = value.match(digitsRegex);
  const firstDigit = getDigit(matches[0]);
  const secondDigit = getDigit(matches[matches.length - 1]);
  return Number(String(firstDigit) + String(secondDigit));
});
const result = digits.reduce((accum, curr) => accum + curr, 0);
console.log(`Day 1 - Result of part 2 => ${result}`);
