const mongoose = require('mongoose')
const isAuthenticated = require('../middleware/isAuthenticated')
const Trip = mongoose.model('Trip')

module.exports = (app) => {
  app.get('/api/trips', isAuthenticated, async (req, res) => {
    const { limit } = req.query
    
    return Trip.find({ deleted: false })
      .sort({ endTime: 'desc' })
      .limit(parseInt(limit))
      .exec((err, trips) => {
        if (err) {
          res.status(500).json({ error: err })
        }

        res.send(trips)
      })
  })
}
