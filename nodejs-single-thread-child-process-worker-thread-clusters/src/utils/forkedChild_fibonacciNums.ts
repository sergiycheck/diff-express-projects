import { FibonacciNumbersRes } from './../types';
import { FibonacciNumbersReq } from '../types';
import { getFibonacciNumsArrDynamically } from './fibonacci';

process.on('message', (msg: FibonacciNumbersReq) => {
  const res = getFibonacciNumsArrDynamically(msg.number);
  const response: FibonacciNumbersRes = { res };
  process.send(response);
  process.exit();
});
