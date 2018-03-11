const mongoose = require('mongoose')
const isAuthenticated = require('../middleware/isAuthenticated')
const Location = mongoose.model('Location')

module.exports = (app) => {
  app.get('/api/locations', isAuthenticated, async (req, res) => {
    Location.find({}, (err, locations) => {
      if(err) {
        res.status(500).json({error: err})
      }

      res.send(locations)
    })
  })
}
