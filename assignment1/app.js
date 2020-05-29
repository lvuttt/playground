// call the packages we need
const express = require('express');  // call express
const bodyParser = require('body-parser')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/mail/send', function (req, res) {
    body = req.body
    var msg = {
        "to": body.to,
        "from": body.from,
        "subject": "Send Grid",
        "text": body.message,
    }
    sgMail.send(msg).then(() => {
        return res.json({
            "message": "Email has been sent"
        });
    }).catch((error) => {
        res.status(error.code)
        return res.json(error.response.body);
    })
});

app.listen(port, () => {
    console.log(`Assignment1 app listening at http://localhost:${port}`)
})