const path = require('path');

require('ts-node').register();

const resolvedPath = path.resolve(__dirname, `./sumOfPrimesWorker.ts`);

require(resolvedPath);
