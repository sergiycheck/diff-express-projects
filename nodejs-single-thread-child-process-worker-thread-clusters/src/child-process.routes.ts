import { ChildProcessFibMsg } from './types';
import express from 'express';
import { spawn, fork } from 'node:child_process';
import { getNumFromQueryMiddleware } from './routes.middlewares';
import path from 'node:path';

const router = express.Router();

router.get('/list-directory', (req, res, next) => {
  let dir = req.query.dir as unknown as string;
  if (!dir) {
    dir = '/usr';
  }
  const ls = spawn('ls', ['-lh', dir]);

  ls.stdout.on('data', (data: Buffer) => {
    res.write(data.toString('utf-8'));
  });

  ls.stderr.on('error', (err) => {
    next(err);
  });

  ls.on('close', (code) => {
    res.end();
  });
});

router.get(
  '/fib-with-child-process',
  getNumFromQueryMiddleware,
  (req, res, next) => {
    const startTime = new Date();
    const fullPath = path.resolve(process.cwd(), './src/forkedChild.ts');

    const childProcess = fork(fullPath);
    const msg: ChildProcessFibMsg = { number: req['number'] };
    childProcess.send(msg);

    childProcess.on('message', (msg) => {
      const endTime = new Date();
      const time = `${endTime.getTime() - startTime.getTime()}ms`;

      res.json({ msg, time });
    });
  },
);

export default router;
