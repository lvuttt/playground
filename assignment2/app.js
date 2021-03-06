const bodyParser = require('body-parser')
const express = require('express')
const dbm = require('./db/model')
const { handleError } = require('./helpers')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/group-management/info', (req, res) => {
  return res.status(200).json(dbm.countGroup());
})
app.put('/group-management/add', (req, res) => {
  return res.status(200).json(dbm.addGroup(req.body.groupName));
})
app.delete('/group-management/delete', (req, res) => {
  return res.status(200).json(dbm.deleteGroup(req.body.groupName));
})
app.post('/group-management/contact-list', (req, res) => {
  return res.status(200).json(dbm.getContactList(req.body.groupName));
})
app.delete('/contact-management/delete', (req, res) => {
  return res.status(200).json(dbm.deleteContact(req.body.groupName, req.body.firstName));
})
app.put('/contact-management/add', (req, res) => {
  return res.status(200).json(dbm.addContact(req.body));
})
app.put('/contact-management/edit', (req, res) => {
  return res.status(200).json(dbm.editContact(req.body));
})
app.post('/contact/info', (req, res) => {
  return res.status(200).json(dbm.getContactInfo(req.body.groupName, req.body.firstName));
})


app.use((err, req, res, next) => {
  handleError(err, res);
})

app.listen(port, () => {
  console.log(`Assignment2 app listening at http://localhost:${port}`)
})