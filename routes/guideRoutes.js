const mongoose = require('mongoose')
const isAuthenticated = require('../middleware/isAuthenticated')

const Guide = mongoose.model('Guide')

module.exports = (app) => {
  app.get('/api/guides', isAuthenticated, async (req, res) => {
    Guide.find({deleted: false}, (err, guides) => {
      if(err) {
        res.status(500).json({error: err})
      }

      res.send(guides)
    })
  })
}