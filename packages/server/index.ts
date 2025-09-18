import dotenv from 'dotenv';
import cors from 'cors';

import express from 'express';
import { createClientAndConnect } from './db';
import reactionsController from './controllers/reactions';

dotenv.config();

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/reactions', reactionsController);

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
