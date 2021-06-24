var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const movieList = require('./mock-data/movieList.json')
const movies = require('./routes/movies')



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', movies);

// app.get('/movies', function(req, res, next) {
//   console.log(movieList)
//   res.json(movieList)
// });

app.listen(3001, () => {
  console.log(`It works`)
})

module.exports = app;
