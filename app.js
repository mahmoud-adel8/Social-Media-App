import path from 'path';
import { fileURLToPath } from 'url';

import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

import feedRoutes from './routes/feed-routes.js';
import { errorHandling } from './middlewares/error-handling.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express();

app.use(json());

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);

app.use(errorHandling);

try {
  await connect(process.env.MONGODB_URI);
  app.listen(8080, () => {
    console.log('listening on port 8080');
  });
} catch (err) {
  console.log(err);
}
