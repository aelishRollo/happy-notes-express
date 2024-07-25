const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

MongoClient.connect()
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
