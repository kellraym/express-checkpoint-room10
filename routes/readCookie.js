var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

  const {firstName, lastName} = req.cookies

  res.status(200).send(`${firstName} ${lastName}`)
  res.end()
})

module.exports = router;