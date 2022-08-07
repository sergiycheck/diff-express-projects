const path = require('path');

require('ts-node').register();

const resolvedPath = path.resolve(__dirname, `./fibonacciNumsWorker.ts`);

require(resolvedPath);
