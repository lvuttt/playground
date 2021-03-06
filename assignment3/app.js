const bodyParser = require('body-parser')
const express = require('express');
const { calculateTax, isNumeric } = require('./helpers')
const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/tax/calculate/:income', function (req, res) {
  var income = req.params.income

  if (isNumeric(income) && parseFloat(income) >= 0) {
    income = parseFloat(income)
    return res.json({
      "tax": calculateTax(income),
    })
  }

  return res.status(400).json({
    "message": "income must be a number which is more than equal 0",
  })
})

app.listen(port, () => {
  console.log(`Assignment3 app listening at http://localhost:${port}`)
})
