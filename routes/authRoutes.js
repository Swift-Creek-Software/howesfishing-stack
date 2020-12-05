const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwToken = require('../services/jwToken')
const User = require('../models/User')

module.exports = (app) => {
  app.post('/api/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email, deleted: false }, (err, user) => {
      console.log('err',err, user)
      if (err) {
        return res.serverError(err)
      } else if (!user) {
        return res.status(401).json({err: 'invalid email or password'})
      }

      comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.status(403).json({err: 'forbidden'})
        }

        if (!valid) {
          return res.status(401).json({err: 'invalid email or password'})
        } else {
          res.json({
            user: user,
            token: jwToken.issue({ id : user.id, isAdmin: user.isAdmin }),
          })
        }
      })
    })
  })
}

function comparePassword(password, user, cb) {
  bcrypt.compare(password, user.encryptedPassword, function (err, match) {

    if (err) cb(err)
    console.log('user', err, match)

    if (match) {
      cb(null, true)
    } else {
      cb(err)
    }
  })
}