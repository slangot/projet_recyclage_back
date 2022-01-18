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
  console.log('Helloooooo')
  const sql = 'INSERT INTO packaging(barcode, recycling, contribution) VALUES(?,?,1)'
  const sqlValues = [
    req.body.barcode,
    req.body.recyclingStatus,
  ]

  mysql.query(sql, sqlValues, (err, result) => {
    if(err) {
      res.status(500).send('Error adding new packaging')
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router