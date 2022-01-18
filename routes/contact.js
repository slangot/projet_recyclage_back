const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

router.get('/', (req, res) => {
  mysql.query(('SELECT * FROM contact'), (err, result) => {
    if(err) {
      res.status(500).send('Error while retrieving messages');
    } else {
      res.status(200).send(result)
    }
  })
})


router.post('/', (req, res) => {
  const sqlValues = [req.body.object, req.body.email, req.body.text];
  const sql = 'INSERT INTO contact(object, email, text, datePosted) VALUES(?,?,?, NOW())'

  mysql.query(sql, sqlValues, (err, result) => {
    if(err) {
      res.status(500).send('Error sending a message')
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router