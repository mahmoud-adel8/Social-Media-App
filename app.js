import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';

import feedRoutes from './routes/feed-routes.js';

const app = express();

app.use(json());

app.use(cors());

app.use('/feed', feedRoutes);

try {
  await connect(
    'mongodb+srv://mahmoud:JJ2zilgHXlKANTjm@node-course.jgl0qhv.mongodb.net/social-media-app?retryWrites=true&w=majority'
  );
  app.listen(8080, () => {
    console.log('listening on port 8080');
  });
} catch (err) {
  console.log(err);
}
