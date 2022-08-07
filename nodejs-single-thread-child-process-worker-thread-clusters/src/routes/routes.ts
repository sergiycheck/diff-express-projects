import { getNumFromQueryMiddleware } from '../middleware/routes.middlewares';
import express from 'express';
import { getFibonacciNumsArrDynamically } from '../utils/fibonacci';
import { isPrimeEffective } from '../utils/isPrime';
import findPrimesFaster from '../utils/find-primes';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'default' });
});

router.get('/health', (_req, res) => {
  res.json({ message: 'up and working! yes!' });
});

router.get(
  '/fibonacci',
  getNumFromQueryMiddleware('number'),
  (req, res, next) => {
    const startTime = new Date();

    let length = req['number'];

    const result = getFibonacciNumsArrDynamically(length);
    const endTime = new Date();
    const time = `${endTime.getTime() - startTime.getTime()}ms`;

    res.json({
      length,
      result,
      time,
    });
  },
);

router.get(
  '/is-prime',
  getNumFromQueryMiddleware('number'),
  (req, res, next) => {
    const startTime = new Date();

    let number = req['number'];

    const result = isPrimeEffective(number);
    const endTime = new Date();
    const time = `${endTime.getTime() - startTime.getTime()}ms`;

    res.json({
      number,
      result,
      time,
    });
  },
);

router.get(
  '/get-primes',
  getNumFromQueryMiddleware('start'),
  getNumFromQueryMiddleware('end'),
  (req, res, next) => {
    const startTime = new Date();

    let start = req['start'];
    let end = req['end'];

    console.log(start, end);

    const result = findPrimesFaster(start, end);
    const endTime = new Date();
    const time = `${endTime.getTime() - startTime.getTime()}ms`;

    res.json({
      start,
      end,
      result,
      time,
    });
  },
);

router.get(
  '/slow',
  getNumFromQueryMiddleware('number'),
  async (req, res, next) => {
    let milliseconds = req['number'];

    milliseconds = await delayMessage(milliseconds);

    async function delayMessage(milliseconds: number) {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve(milliseconds);
        }, milliseconds);
      });
    }

    return res.json({ message: `${milliseconds}ms delayed message` });
  },
);

export default router;
