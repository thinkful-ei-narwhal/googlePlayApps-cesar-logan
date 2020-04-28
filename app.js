'use strict';

const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');

const app = express();

// app.use(cors());

app.use(morgan('common'));

const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
  const { search = '', sort } = req.query;

  if (sort) {
    if (!['app', 'rating', 'genre'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of app, rating or genre');
    }
  }

  let results = apps
    .filter(app =>
      app
        .App
        .toLowerCase()
        .includes(search.toLowerCase()));

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }
  const { filterGenre } = req.query; if (filterGenre) {
    results
      .filter((c) => {
        return c[filterGenre];
      });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});