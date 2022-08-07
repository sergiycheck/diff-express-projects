import path from 'node:path';
import fs from 'node:fs';
import { promisify } from 'node:util';

export function checkIfFileExists(filePathFromScr: string, reqProp: string) {
  return async function checkIfFileExistsMiddleware(req, res, next) {
    const fullPath = path.resolve(process.cwd(), filePathFromScr);
    const fsAccessPromisified = promisify(fs.access);

    try {
      await fsAccessPromisified(fullPath, fs.constants.F_OK);

      req[reqProp] = fullPath;
    } catch (error) {
      next(error);
    }

    next();
  };
}
