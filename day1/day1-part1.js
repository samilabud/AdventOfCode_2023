import fs from "fs";
const textResult = fs.readFileSync("./day1/input.txt", "utf-8");
const calibrations = textResult.split("\n");

const firstDigitRegex = new RegExp(/\d/);
const lastDigitRegex = new RegExp(/\d(?=\D*$)/);

const digits = calibrations.map((value) => {
  if (!value) return 0;
  const firstDigit = value.match(firstDigitRegex);
  const secondDigit = value.match(lastDigitRegex);
  return Number(String(firstDigit) + String(secondDigit));
});
const result = digits.reduce((accum, curr) => accum + curr, 0);
console.log(`Day 1 - Result of part 1 => ${result}`);
