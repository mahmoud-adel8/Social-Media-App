import path from 'path';
import { fileURLToPath } from 'url';

import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

import feedRoutes from './routes/feed-routes.js';
import authRoutes from './routes/auth-routes.js';
import { errorHandler } from './middlewares/error-handler.js';
import { upload } from './util/file-helper.js';
import { verifyToken } from './middlewares/authorization.js';
import { notFoundHandler } from './middlewares/not-found-handler.js';
import * as socketIO from './util/socket.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(json());

app.use(cors());

app.use(upload().single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', verifyToken, feedRoutes);

app.use('/auth', authRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

try {
  await connect(process.env.MONGODB_URI);
  const server = app.listen(PORT);
  console.log('connected successfully');
  const io = socketIO.init(server);
  io.on('connection', socket => {
    console.log('client connected.')
  })
} catch (err) {
  console.log(err);
}
