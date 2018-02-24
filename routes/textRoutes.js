const twilio = require('twilio');
const keys = require('../config/keys')
const isAdmin = require('../middleware/isAdmin')
const isAuthenticated = require('../middleware/isAuthenticated')


const client = new twilio(keys.twilioAccountSid, keys.twilioAuthToken);
module.exports = (app) => {
  app.post('/api/text', isAuthenticated, isAdmin, (req, res) => {
    console.log('hit the text route', req.body)

    const body = req.body
    client.messages.create({
      body: body.body,
      to: '+' + body.number,  // Text this number +
      from: keys.twilioFrom// From a valid Twilio number
    })
      .then((message) => {
        console.log(message.sid)
        res.send(message.sid)
      })
      .catch((e) => {
        res.status(500).send('error with text message')
      });
  })
}