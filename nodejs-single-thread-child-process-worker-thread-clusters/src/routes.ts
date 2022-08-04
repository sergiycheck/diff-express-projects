import { getNumFromQueryMiddleware } from './routes.middlewares';
import express from 'express';
import { getFibonacciNumsArrDynamically } from './fibonacci';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'default' });
});

router.get('/health', (_req, res) => {
  res.json({ message: 'up and working! yes!' });
});

router.get('/fibonacci', getNumFromQueryMiddleware, (req, res, next) => {
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
});

router.get('/slow', getNumFromQueryMiddleware, async (req, res, next) => {
  let milliseconds = req['number'];

  milliseconds = await delayMessage(milliseconds);

  async function delayMessage(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(milliseconds);
      }, milliseconds);
    });
  }

  return res.json({ message: `${milliseconds} delayed message` });
});

export default router;
