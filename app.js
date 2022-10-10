import path from 'path';
import { fileURLToPath } from 'url';

import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

import feedRoutes from './routes/feed-routes.js';
import { errorHandling } from './middlewares/error-handling.js';
import { upload } from './util/file-upload-helper.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(json());

app.use(cors());

app.use(upload.single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);

app.use(errorHandling);

try {
  await connect(process.env.MONGODB_URI);
  app.listen(PORT);
  console.log('connected successfully')
} catch (err) {
  console.log(err);
}
