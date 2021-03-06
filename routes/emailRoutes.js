const EmailService = require('../services/EmailService')
const isAdmin = require('../middleware/isAdmin')
const isAuthenticated = require('../middleware/isAuthenticated')
const mongoose = require('mongoose')

const Email = mongoose.model('Email')

module.exports = (app) => {
  app.post('/api/email', isAuthenticated, isAdmin, (req, res) => {
    const params = { ...req.body }
    EmailService
      .sendEmail(params)
      .then(data => {
        return Email.create({ sparkpostResponse: data, params: params })
      })
      .then(() => {
        return res.send("ok")
      })
      .catch(err => {
        // error sending email
        return res.status(401).json({ err })
      })
  })
}