const PORT = process.env.PORT || 3000;
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

let connectionString = process.env.DB_STRING


MongoClient.connect(connectionString) //Connect to Mongo
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('cluster0')        //Get my cluster
    const quotesCollection = db.collection('quotes')        //Get my table of quotes from my cluster


  app.post('/quotes', (req, res) => {   //To update the table, do things like quotesCollection.insertOne()
    quotesCollection
        .insertOne(req.body)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    res.send('You have submitted data to the database')
  })

  app.get('/',(req,res) => {
    console.log('ROOT ROUTE RAIDED, RUH-ROH-RAGGY')

    db.collection('quotes')
        .find()
        .toArray()
        .then(results => {
            res.render('index.ejs', {quotes:results})
        })
        .catch(error => console.error(error))
    
})

  })
  .catch(error => console.error(error))




app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log(`Hello Wizard, we listening on ${PORT}`)
})
