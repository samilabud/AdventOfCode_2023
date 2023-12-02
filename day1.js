//Executed at https://adventofcode.com/2023/day/1/input using the chrome console

const fetchURL = "https://adventofcode.com/2023/day/1/input";

const resolveFn = async () => {
  const fetchData = await fetch(fetchURL);
  const textResult = await fetchData.text();
  //   const textResult3 = `
  //   1abc2
  //   pqr3stu8vwx
  //   a1b2c3d4e5f
  //   treb7uchet
  //   124
  //   4pp
  //   mpfpnqqrsspmdjpkmrrlljrlsddnsix38three
  //   3sixeightnkgpssqnkrsclmshzzfhxxhvxlsljgfgnltbpc1twoneqd
  // `;
  const calibrations = textResult.split("\n");

  const firstDigitRegex = new RegExp(/\d/);
  const lastDigitRegex = new RegExp(/\d(?=\D*$)/);

  const digits = calibrations.map((value) => {
    if (!value) return 0;
    const firstDigit = value.match(firstDigitRegex);
    const secondDigit = value.match(lastDigitRegex);
    console.log({ firstDigit, secondDigit });
    return Number(String(firstDigit) + String(secondDigit));
  });
  console.log(digits);
  console.log(
    digits.reduce((accum, curr) => accum + curr),
    0
  );
};

resolveFn();
