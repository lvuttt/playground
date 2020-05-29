// call the packages we need
const express = require('express');  // call express
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Assignment2 app listening at http://localhost:${port}`)
})