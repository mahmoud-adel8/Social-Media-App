const express = require('express');
const cors = require('cors');

app = express();

app.use(cors());

app.listen(8080, () => {
  console.log('listening on port 8080');
})