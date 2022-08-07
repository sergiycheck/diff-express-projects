export default function sumOfPrimes(
  getPrimesFunction: (start: number, end: number) => number[],
  start: number,
  end: number,
) {
  const primesArr = getPrimesFunction(start, end);
  const result = primesArr.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  return result;
}
