const mongoose = require('mongoose')
const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')

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

  app.post('/api/guides', isAuthenticated, isAdmin, async (req, res) => {
    const guide = {
      ...req.body,
      deleted: false
    }

    Guide.create(guide, (err, guide) => {
      if(err) {
        res.status(500).json({error: err})
      }

      res.send(guide)
    })
  })

  app.put('/api/guides/:id', isAuthenticated, isAdmin, async (req, res) => {
    const guide = {...req.body}
    Guide.findOneAndUpdate({_id: req.params.id}, guide, (err) => {
      if(err) {
        res.status(500).json({error: err})
      }
      res.send(guide)
    })

  })

  app.delete('/api/guides/:id', isAuthenticated, isAdmin, async (req, res) => {
    Guide.findOneAndUpdate({_id: req.params.id}, {deleted: true}, (err, guide) => {
      if(err) {
        res.status(500).json({error: err})
      }
      res.send(guide)
    })

  })
}
