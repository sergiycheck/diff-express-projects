import { getNumFromQueryMiddleware } from './../middleware/routes.middlewares';
import {
  FibonacciNumbersReq,
  FibonacciNumbersRes,
  WorkerThreadSumOfPrimeNumbersRequest,
  WorkerThreadSumOfPrimeNumbersResponse,
} from '../types';
import express from 'express';

import { Worker } from 'node:worker_threads';
import { checkIfFileExists } from '../middleware/checkIfFileExists';

const router = express.Router();

const workerSumOfPrimesPathFromScr = './src/utils/sumOfPrimesWorker.js';
router.get(
  '/worker-threads-sum-of-primes-multiple-times',
  checkIfFileExists(workerSumOfPrimesPathFromScr, 'fullPath'),
  getNumFromQueryMiddleware('times'),
  getNumFromQueryMiddleware('start'),
  getNumFromQueryMiddleware('end'),
  async (req, res, next) => {
    const startTime = new Date();

    const fullPath = req['fullPath'];
    const start = req['start'];
    const end = req['end'];
    const times = req['times'];

    const sumOfAllWorkersResultsPromises = await runMultipleWorkers(
      fullPath,
      start,
      end,
      times,
    );
    const sumOfAllWorkersResults = sumOfAllWorkersResultsPromises.reduce(
      (prev, curr) => prev + curr.result,
      0,
    );

    const endTime = new Date();

    const time = `${endTime.getTime() - startTime.getTime()}ms`;

    res.json({ sumOfAllWorkersResults, time });
  },
);

const workerFibonacciNumbersPathFromScr =
  './src/utils/fibonacciNumsWorkerHelper.js';
router.get(
  '/fib-with-worker-threads',
  checkIfFileExists(workerFibonacciNumbersPathFromScr, 'fullPath'),
  getNumFromQueryMiddleware('number'),
  async (req, res, next) => {
    const startTime = new Date();
    const fullPath = req['fullPath'];

    const msg: FibonacciNumbersReq = { number: req['number'] };
    const result = await runWorker<FibonacciNumbersReq, FibonacciNumbersRes>(
      fullPath,
      msg,
    );

    const endTime = new Date();
    const time = `${endTime.getTime() - startTime.getTime()}ms`;
    res.json({ result, time });
  },
);

async function runMultipleWorkers(
  fullFilePath: string,
  start: number,
  end: number,
  times: number,
) {
  const workersArr: Promise<WorkerThreadSumOfPrimeNumbersResponse>[] = [];
  [times].forEach(() => {
    workersArr.push(
      runWorker<
        WorkerThreadSumOfPrimeNumbersRequest,
        WorkerThreadSumOfPrimeNumbersResponse
      >(fullFilePath, { start, end }),
    );
  });

  return await Promise.all(workersArr);
}

export function runWorker<TWorkerData, TResult>(
  fullFilePath: string,
  workerData: TWorkerData,
): Promise<TResult> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(fullFilePath, {
      workerData,
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

export default router;
