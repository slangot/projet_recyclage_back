const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

router.get('/count', (req, res) => {
  mysql.query(('SELECT COUNT(*) FROM packaging'), (err, result) => {
    if(err) {
      res.status(500).send('Error while counting');
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/:barcode', (req, res) => {
  const sqlValues = [req.params.barcode];
  const sql = 'SELECT * FROM packaging WHERE id = ?';
  mysql.query(sql, sqlValues, (err, result) => {
    if(err) {
      res.status(500).send('Error while counting');
    } else {
      res.status(200).send(result)
    }
  })
})

router.post('/', (req, res) => {
  const sql = 'INSERT INTO packaging(barcode, recycling, contribution) VALUES(?,?,?)'
  const sqlValues = [
    req.body.barcode,
    req.body.recycling,
    1
  ]
  console.log(typeof(sqlValues[0]))
  console.log(typeof(sqlValues[1]))
  console.log(typeof(sqlValues[2]))

  mysql.query(sql, sqlValues, (err, result) => {
    if(err) {
      res.status(500).send('Error adding new packaging')
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router