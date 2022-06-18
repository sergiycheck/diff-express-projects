import mongoose from "mongoose";
import request from "supertest";
import app from "../src/app.js";
import seedDb from "./../src/seedDb.js";
import { AuthorModel } from "../src/models/author.js";
import { PostModel } from "../src/models/post.js";

import { defaultRoute, authorsRoute, postsRoute } from "./../src/apiRoutes";

const connectionString =
  "mongodb://127.0.0.1:27017/testingPurposesDb?directConnection=true&serverSelectionTimeoutMS=2000";

describe("test api endpoints", () => {
  let server;

  beforeAll(() => {
    server = app;
  });

  beforeEach((done) => {
    mongoose.connect(connectionString, () => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        done();
      });
    });
  });

  test("testing if api return message", async () => {
    await request(server)
      .get(defaultRoute)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("working api");
      });
  });

  test("seeds authors  and gets the list of authors", async () => {
    await seedDb(mongoose);

    await request(server)
      .get(authorsRoute)
      .expect(200)
      .then((response) => {
        const data = response.body;

        expect(data.count).toBe(2);
        expect(Array.isArray(data.authors));
      });
  });

  test("seeds posts and gets the list of posts", async () => {
    await seedDb(mongoose);

    await request(server)
      .get(postsRoute)
      .expect(200)
      .then((response) => {
        const data = response.body;

        expect(data.count).toBe(5);
        expect(Array.isArray(data.posts));
      });
  });

  test("creates author", async () => {
    await request(server)
      .post(authorsRoute)
      .send({
        name: "testAuthorName1",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        const data = response.body;

        expect(data.createdAuthor.name).toBe("testAuthorName1");
        expect(data.createdAuthor.id).toBeTruthy();
      });
  });
});
