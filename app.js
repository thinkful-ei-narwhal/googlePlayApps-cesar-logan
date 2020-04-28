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
    if (!['App', 'Rating'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of App, Rating');
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

  const { filter} = req.query;

  if (filter) {
    if (!['Action', 'Puzzle','Strategy', 'Casual','Card', 'Arcade'].includes(filter)) {
      return res
        .status(400)
        .send('Filter must be one of Action, Puzzle, Strategy, Casual, Card, Arcade');
    }
  }

  if (filter) {
    results.filter((c) => {
      return c[filter];
    });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});