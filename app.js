const express = require('express');
const cors = require('cors');

app = express();

const feedRoutes = require('./routes/feed-routes');

app.use(express.json());

app.use(cors());

app.use('/feed', feedRoutes);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
