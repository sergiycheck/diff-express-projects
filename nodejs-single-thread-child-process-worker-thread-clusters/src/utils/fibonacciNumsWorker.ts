import { workerData, parentPort } from 'node:worker_threads';
import { FibonacciNumbersReq, FibonacciNumbersRes } from '../types';
import { getFibonacciNumsArrDynamically } from './fibonacci';

const { number } = workerData as FibonacciNumbersReq;
const res = getFibonacciNumsArrDynamically(number);
const response: FibonacciNumbersRes = { res };

parentPort.postMessage(response);
