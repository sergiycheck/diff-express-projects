import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import { UserController } from "./controller/user.controller";
import { notFoundErrorHandler } from "./handlers/error-handler";
import { appErrorHandler } from "./handlers/error-handler";

const debugLog: debug.IDebugger = debug("server");

class Server {
  private userController: UserController;
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 3001);
    this.app.use(express.json());
    this.app.use(cors());

    const loggerOptions: expressWinston.LoggerOptions = {
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
      ),
    };

    const whenNotDebuggingLogOneLine = Boolean(!process.env.DEBUG);
    if (whenNotDebuggingLogOneLine) {
      loggerOptions.meta = false;
    }

    this.app.use(expressWinston.logger(loggerOptions));
  }

  public async routes() {
    await createConnection();

    this.userController = new UserController();

    this.app.use(`/default`, (req: Request, res: Response) => {
      res.send("Hello world!");
    });

    this.app.use(`/api/users/`, this.userController.router);

    this.app.use(notFoundErrorHandler);
    this.app.use(appErrorHandler);
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      debugLog(`Server is listening ${this.app.get("port")} port.`);
    });
  }
}

const server = new Server();
server.start();
