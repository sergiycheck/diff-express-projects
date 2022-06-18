import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import { PostController } from "./controller/post.controller";

const degubLog: debug.IDebugger = debug("server");

class Server {
  private postController: PostController;
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

    this.postController = new PostController();

    this.app.get("/default", (req: Request, res: Response) => {
      res.send("Hello world!");
    });

    this.app.use(`/api/posts/`, this.postController.router);
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      degubLog(`Server is listening ${this.app.get("port")} port.`);
    });
  }
}

const server = new Server();
server.start();
