const mongoose = require('mongoose')

const User = mongoose.model('User')

module.exports = (app) => {
  app.post('/api/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    console.log('hit the login route', email, password)
    User.findOne({ email: email, deleted: false }, (err, user) => {
      console.log('user', user)
    })
  })
}