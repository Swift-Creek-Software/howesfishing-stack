const mongoose = require('mongoose')
const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')
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

  app.get('/api/trips/phone/:phone', isAuthenticated, async (req, res) => {
    const phone = req.params.phone

    return Trip.find({ deleted: false, phone })
      .sort({ endTime: 'desc' })
      .limit(1)
      .exec((err, trips) => {
        if (err) {
          res.status(500).json({ error: err })
        }
        res.send(trips)
      })
  })

  app.post('/api/trips', isAuthenticated, isAdmin, async (req, res) => {
    Trip.create({...req.body, deleted: false}, (err, trip) => {
      if(err) {
        res.status(500).json({error: err})
      }

      res.send(trip)
    })
  })

  app.put('/api/trips/:id', isAuthenticated, isAdmin, async (req, res) => {
    const trip = {...req.body}
    Trip.findOneAndUpdate({_id: req.params.id}, {...trip, deleted: false}, (err, updated) => {
      console.log('trip update: ', trip)
      if(err) {
        res.status(500).json({error: err})
      }
      res.send(updated)
    })

  })

  app.delete('/api/trips/:id', isAuthenticated, isAdmin, async (req, res) => {
    Trip.findOneAndUpdate({_id: req.params.id}, {deleted: true}, (err, trip) => {
      if(err) {
        res.status(500).json({error: err})
      }
      res.send(trip)
    })

  })
}
