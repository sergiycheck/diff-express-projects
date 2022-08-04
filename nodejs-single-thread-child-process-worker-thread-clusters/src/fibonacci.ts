export function getFibonacciNumsArr(length: number) {
  let arr = [];
  function genFibonacci(
    first: number,
    second: number,
    count: number,
    length: number,
  ): number[] {
    if (count > length) return arr;

    arr.push(first);

    return genFibonacci(second, first + second, ++count, length);
  }

  const result = genFibonacci(0, 1, 0, length);
  console.log('result', result);
  return result;
}

export function getFibonacciNumsArrDynamically(length: number) {
  let arr = [];
  let first = 0;
  let second = 1;

  for (let i = 0; i < length; i++) {
    let nextFirst = second;
    second = first + second;
    first = nextFirst;
    arr.push(first);
  }

  return arr;
}
