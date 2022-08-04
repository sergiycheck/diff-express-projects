import dotenv from 'dotenv';
dotenv.config();
import { AddressInfo } from 'net';
import createServer from './app1';
import http from 'http';

const port = process.env.PORT || 5002;

(async function startServer() {
  const app = await createServer();

  try {
    const server = http.createServer(app).listen(port, () => {
      const addressInfo = server.address() as AddressInfo;
      console.log(`Listening on port ${addressInfo.port}`);
    });
  } catch (error) {
    console.log('could not create server ', error);
    process.exit(1);
  }
})();
