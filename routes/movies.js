var express = require('express');
var router = express.Router();
const fs =require('fs')
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
  res.end()
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
  res.end()
})

router.post('/', (req, res) => {
  fs.readFile('./mock-data/movieList.json', 'utf8', (err, data) => {
    if (err){
      throw(err)
    } else {
      const newFile = JSON.parse(data)
      console.log(req.body)
      const newMovie = req.body
      newMovie.id = newFile.length + 1
      newFile.push(newMovie)
      console.log(newFile)

      fs.writeFile('./mock-data/movieList.json', JSON.stringify(newFile, null, 4), (err) => {if(err) throw(err)})
    }
  })
  res.end()
})

router.delete('/:id', (req, res) => {
  fs.readFile('./mock-data/movieList.json', 'utf8', (err, data) => {
    if (err){
      throw(err)
    } else {
      const newFile = JSON.parse(data)
      const filteredFile = newFile.filter(movie => {
        return movie.id !== Number(req.params.id)
      })
      fs.writeFile('./mock-data/movieList.json', JSON.stringify(filteredFile, null, 4), (err) => {if(err) throw(err)})
    }
  })
  res.end()
})
module.exports = router;
