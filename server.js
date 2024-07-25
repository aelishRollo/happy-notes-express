const express = require('express')
const app = express()
const PORT = 3000


app.listen(3000, () => {
    console.log(`Hello Wizard, we listening on ${PORT}`)
})


app.get('/',(req,res) => {
    console.log('ROOT ROUTE RAIDED, RUH-ROH-RAGGY')
    res.send('Hello, Universe')
})
