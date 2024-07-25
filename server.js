const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 3000;
require('dotenv').config();

let connectionString = process.env.DB_STRING


MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database')
  })
  .catch(error => console.error(error))


app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log(`Hello Wizard, we listening on ${PORT}`)
})


app.get('/',(req,res) => {
    console.log('ROOT ROUTE RAIDED, RUH-ROH-RAGGY')
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
    res.send(req.body)
  })
