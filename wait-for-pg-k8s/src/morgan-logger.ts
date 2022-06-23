import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import logsDir from './logs-dir';
import { Request, Response, NextFunction } from 'express';

const accessLogStream = fs.createWriteStream(
  path.join(logsDir(), 'access.log'),
  { flags: 'a' },
);

export const morganLogger = function () {
  type ConfigTokensType = {
    tokenName: string;
    reqFallBack: (req: Request) => string;
  };
  const tokens: ConfigTokensType[] = [
    { tokenName: 'host', reqFallBack: (req: Request) => req.hostname },
    {
      tokenName: 'X-Real-IP',
      reqFallBack: (req: Request) => req.ip,
    },
    {
      tokenName: 'X-Forwarded-For',
      reqFallBack: (req: Request) => req.socket.remoteAddress,
    },
    {
      tokenName: 'X-Forwarded-Proto',
      reqFallBack: (req: Request) => req.protocol,
    },
  ];

  function getToken(tokenObj: ConfigTokensType) {
    return (req: Request, _) => {
      const token =
        (req.headers[tokenObj.tokenName] as string) ||
        tokenObj.reqFallBack(req);
      return token;
    };
  }

  tokens.forEach((tokenObj) =>
    morgan.token(tokenObj.tokenName, getToken(tokenObj)),
  );

  const tokensStr = tokens.map((t) => `:${t.tokenName}`).join(' ');

  const format = `${tokensStr} [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;
  const formatName = 'customFormat';

  // define format
  morgan.format(formatName, format);

  return morgan(formatName, { stream: accessLogStream });
};
