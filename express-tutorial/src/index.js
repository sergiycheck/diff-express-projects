import http from "http";
import app from "./app.js";
import seedDb from "./seedDb.js";
import mongoose from "mongoose";

async function connectToDb() {
  const connectionString = process.env.LOCAL_MONGODB;
  await mongoose.connect(connectionString);

  await seedDb(mongoose);
}

connectToDb()
  .then(() => {
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    server.listen(port);
  })
  .catch((err) => log(err));
