const jwToken = require('../services/jwToken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = function (req, res, next) {
  let token

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')
    if (parts.length === 2) {
      const scheme = parts[ 0 ]
      const credentials = parts[ 1 ]

      if (/^Bearer$/i.test(scheme)) {
        token = credentials
      }
    } else {
      return res.status(401).json({ err: 'Format is Authorization: Bearer [token]' })
    }
  } else if (req.param('token')) {
    token = req.param('token')
    // We delete the token from param to not mess with blueprints
    delete req.query.token
  } else {
    return res.status(401).json({ err: 'No Authorization header was found' })
  }

  jwToken.verify(token, function (err, token) {
    if (err) return res.json(401, { err: 'Invalid Token!' })
    req.token = token // This is the decrypted token or the payload set when verified

    // verify user is active/not-deleted
    User.findOne({ _id: token.id }, (err, user) => {

      if (err) {
       return res.status(401).json({ err: 'Error finding user' })
      }

      if (!user || user.deleted) {
        return res.status(401).json({ err: 'Inactive user' })
      }

      return next()
    })
  })
}
