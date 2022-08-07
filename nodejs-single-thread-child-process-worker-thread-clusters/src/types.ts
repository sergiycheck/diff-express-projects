export type FibonacciNumbersReq = {
  number: number;
};

export type FibonacciNumbersRes = {
  res: number[];
};

export type WorkerThreadSumOfPrimeNumbersRequest = {
  start: number;
  end: number;
};

export type WorkerThreadSumOfPrimeNumbersResponse =
  WorkerThreadSumOfPrimeNumbersRequest & {
    result: number;
  };
