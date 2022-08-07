import { workerData, parentPort } from 'node:worker_threads';

import {
  WorkerThreadSumOfPrimeNumbersRequest,
  WorkerThreadSumOfPrimeNumbersResponse,
} from './../types';
import findPrimesFaster from './find-primes';
import sumOfPrimes from './sumOfPrimes';

const { start, end } = workerData as WorkerThreadSumOfPrimeNumbersRequest;

const sum = sumOfPrimes(findPrimesFaster, start, end);

const resultMessage: WorkerThreadSumOfPrimeNumbersResponse = {
  start,
  end,
  result: sum,
};

parentPort.postMessage(resultMessage);
