const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')

const User = mongoose.model('User')

module.exports = (app) => {
  // app.get('/api/guides', isAuthenticated, async (req, res) => {
  //   Guide.find({deleted: false}, (err, guides) => {
  //     if(err) {
  //       res.status(500).json({error: err})
  //     }
  //
  //     res.send(guides)
  //   })
  // })

  app.post('/api/users', isAuthenticated, isAdmin, async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({ err: 'Password doesn\'t match, What a shame!' })
    }

    const user = { ...req.body }
    console.log('user', user)
    return  bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).json({ error: err })
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return res.status(500).json({ error: err })
        }
        user.encryptedPassword = hash

        delete user.password
        delete user.confirmPassword

        console.log('creating user', user)
        User.create(user, (err, created) => {
          if (err) {
            return res.status(500).json({ error: err })
          }

          res.json({user: created})
        })
      })
    })


  })

  app.put('/api/users/:id', isAuthenticated, async (req, res) => {
    const user = { ...req.body }

    if (user.password && user.confirmPassword ){

      if (user.password !== user.confirmPassword) {
        return res.status(401).json({ err: 'Password doesn\'t match, What a shame!' })
      }



      return bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res.status(500).json({ error: err })
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            return res.status(500).json({ error: err })
          }
          user.encryptedPassword = hash

          delete user.password
          delete user.confirmPassword


          User.findOneAndUpdate({ _id: req.params.id }, user, (err, updated) => {
            if (err) {
              return res.status(500).json({ error: err })
            }
            res.json({user: updated})
          })

        })
      })

    } else {
      User.findOneAndUpdate({ _id: req.params.id }, user, (err, updated) => {
        if (err) {
          return res.status(500).json({ error: err })
        }
        res.json({user: updated})
      })
    }
  })


  app.delete('/api/users/:id', isAuthenticated, isAdmin, async (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {deleted: true}, (err, user) => {
      if(err) {
        res.status(500).json({error: err})
      }
      res.send(user)
    })

  })
}
