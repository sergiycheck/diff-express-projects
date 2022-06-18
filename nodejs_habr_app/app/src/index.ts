import express, { Express, RequestHandler } from "express";
import dotenv from "dotenv";
import log4js from "log4js";
import bodyParser from "body-parser";
import { useExpressServer } from "routing-controllers";
import httpContext from "express-http-context";
import { UserController } from "./controllers/UserController";
import { GlobalErrorHandler } from "./middleware/globalErrorHandler";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/openapi.json";
import cors from "cors";
import config from "config";

dotenv.config();
// const port = process.env.PORT;
const port = config.get("port");
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL!;

const app: Express = express();
app.use(cors() as RequestHandler); // we must place use cors here otherwise we have error (Error: Cannot set headers after they are sent to the client)
app.use(bodyParser.json());
app.use(httpContext.middleware);

useExpressServer(app, {
  controllers: [UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: any, res: any) => {
  res.send("working server");
});

app.listen(port, () => console.log(`Running on port ${port}`));
