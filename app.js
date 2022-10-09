import express, { json } from 'express';
import cors from 'cors';

import feedRoutes from './routes/feed-routes.js';

const app = express();

app.use(json());

app.use(cors());

app.use('/feed', feedRoutes);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
