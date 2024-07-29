const PORT = process.env.PORT || 3000;

const MongoClient = require('mongodb').MongoClient
require('dotenv').config();
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())




let connectionString = process.env.DB_STRING


MongoClient.connect(connectionString) //Connect to Mongo
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('cluster0')        //Get my cluster
        const quotesCollection = db.collection('quotes')        //Get my table of quotes from my cluster



        app.get('/', (req, res) => {
            console.log('ROOT ROUTE RAIDED, RUH-ROH-RAGGY')

            db.collection('quotes')
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))

        })



        app.post('/quotes', (req, res) => {   //To add to the table, do things like quotesCollection.insertOne()
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
            res.send('You have submitted data to the database')
        })

       

        app.put('/quotes', (req, res) => {   //To update the table, do things like quotesCollection.findOneAndUpdate()
            quotesCollection
                .findOneAndUpdate(
                    { name: 'Yoda' },
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote,
                        },
                    },
                    {
                        upsert: true,
                    }
                )
                .then(response => {
                    res.json('Successfully upserted, baby')
                  })
                .catch(error => console.error(error))
        })



        app.delete('/quotes', (req,res) => {
            quotesCollection.deleteOne({name: req.body.name})
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                  }
                res.json(`Deleted Darth Vader's quote`)
            })
            .catch(error => console.error(error))
        })




    })
    .catch(error => console.error(error))



app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log(`Hello Wizard, we listening on ${PORT}`)
})
