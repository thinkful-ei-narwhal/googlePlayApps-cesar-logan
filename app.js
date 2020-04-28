'use strict';

const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');

const app = express();

// app.use(cors());

app.use(morgan('common'));

const apps= require('playstore.js');

app.get('/apps', (req, res) => {
    

});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});