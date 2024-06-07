import { setupServer } from './src/server.js';
import { initMongoConnection } from './db/initMongoConnection';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
