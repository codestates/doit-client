const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  if (process.env.NODE_ENV === 'production') {
    server.use(morgan('conbined'));
  } else {
    server.use(morgan('dev'));
  }
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('next+express running on port 3000');
  });
});
