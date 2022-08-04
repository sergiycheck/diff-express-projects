import { ChildProcessFibMsg } from './types';
import { getFibonacciNumsArrDynamically } from './fibonacci';

process.on('message', (msg: ChildProcessFibMsg) => {
  const res = getFibonacciNumsArrDynamically(msg.number);
  process.send(res);
  process.exit();
});
