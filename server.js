const express = require('express')
const app = express()
const PORT = 3000


app.listen(3000, () => {
    console.log(`Hello Wizard, we listening on ${PORT}`)
})


app.get('/',(req,res) => {
    console.log('ROOT ROUTE RAIDED, RUH-ROH-RAGGY')
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log('User made a POST request')
  })
