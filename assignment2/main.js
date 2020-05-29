// call the packages we need
const express = require('express');  // call express
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/mail/send', function (req, res) {
  body = req.body
  sendEmail({
    "to": body.to,
    "from": body.from,
    "subject": "Send Grid",
    "text": body.message,
  }).then(() => {
    return res.json({
      "message": "Email has been sent"
    });
  }).catch((error) => {
    res.status(error.code)
    return res.json(error.response.body);
  })
});

const sendEmail = function (mailOptionsObject) {

  const msg = {
    to: mailOptionsObject.to,
    from: mailOptionsObject.from,
    subject: mailOptionsObject.subject,
    text: mailOptionsObject.text
  };

  const status = sgMail.send(msg)

  return status;

};

app.listen(port, () => {
  console.log(`Assignment2 app listening at http://localhost:${port}`)
})