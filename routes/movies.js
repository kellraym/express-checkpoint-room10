var express = require('express');
// const app = express()
var router = express.Router();
const movieList = require('../mock-data/movieList.json')

/* GET home page. */
router.get('/', function (req, res, next) {
  let title = req.query.title
  console.log(title)
  if (!title) {
    if (!movieList) {
      res.status(404).send(`No movies`)
    } else {
      res.status(200).send(movieList)
    }
  }
  let filteredList = movieList.filter(movie => {
    return movie.title.includes(title)
  })
  if (filteredList.length < 1) {
    res.status(404).send('Your query string returned no results.')
  } else {
    res.status(200).send(filteredList)
  }
  //what is an invalid string?
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id)

  let filteredList = movieList.filter(movie => {
    return movie.id === id
  })
  if (!id) {
    res.status(400).send(`Invalid ID Supplied`)
  } else if (!filteredList) {
    res.status(404).send(`Movie ID not found`)
  } else {
    res.status(200).send(filteredList[0])
  }
})

module.exports = router;
