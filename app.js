import path from 'path';
import { fileURLToPath } from 'url';

import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import multer from 'multer';

import feedRoutes from './routes/feed-routes.js';
import { errorHandling } from './middlewares/error-handling.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express();

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    const fileName = date + '-' + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });


app.use(json());

app.use(cors());

app.use(upload.single('image'));

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
