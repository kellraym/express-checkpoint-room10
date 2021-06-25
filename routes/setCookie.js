var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  const {firstName, lastName} = req.body
  res.cookie('firstName', firstName, {path: '/readCookie'})
  res.cookie('lastName', lastName, {path: '/readCookie'})
  res.end()
})

module.exports = router;