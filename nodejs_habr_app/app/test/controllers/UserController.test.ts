import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { useExpressServer } from "routing-controllers";

import { Info } from "src/models/infoModel";
import { UserController } from "../../src/controllers/UserController";
import { GlobalErrorHandler } from "./../../src/middleware/globalErrorHandler";

describe("UserController", () => {
  let server: any;
  beforeAll(async () => {
    server = express();
    server.use(bodyParser.json());

    useExpressServer(server, {
      controllers: [UserController],
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("postOne controller method", () => {
    const userController = new UserController();
    const notEnoughBody = {
      city: "city declared"
    };
    const res = userController.postOne(1, notEnoughBody as Info);
    expect(res).toBe("Ok");
  });

  it("http post request for controller method postOne invalid request 1", (done) => {
    request(server)
      .post("/users/:id")
      .send({
        country: "first Country"
      } as Info)
      .expect(400)
      .end((err, res) => {
        if (err) throw new Error(JSON.stringify(res.body));
        done();
      });
  });

  it("http post request for controller method postOne valid request 2", (done) => {
    request(server)
      .post("/users/:id")
      .send({
        country: "first",
        city: "some data here",
        name: "name1",
        surname: "surname1"
      } as Info)
      .expect(200, done);
  });
});
