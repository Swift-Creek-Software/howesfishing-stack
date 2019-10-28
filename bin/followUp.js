const EmailService = require('../services/EmailService')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const {startOfDay, endOfDay, format} = require('date-fns')

require('../models/Trip')

const Trip = mongoose.model('Trip')

mongoose.connect(keys.mongoURI, { useMongoClient: true })
mongoose.Promise = global.Promise;

Trip.find({ deleted: false, endTime: {"$gte": startOfDay(new Date()), "$lt": endOfDay(new Date())} })
  .sort({ endTime: 'asc'})
  .exec((err, trips) => {
    if (err) {
      return err
    }

    const params = {
      sandbox: false,
      recipients: [
        {
          address: 'grossmail1@gmail.com'
        },
        {
          address: {
            "email": "reservations@howesfishing.com",
            "header_to": 'grossmail1@gmail.com'
          }
        }
      ],
      templateId: 'client-follow-up',
      templateData: {
        trips,
        subject: `${format(new Date(), 'MM/dd/yyyy')} Fishing follow up`,
      },
      campaignId: 'Client confirmation',
    }

    return EmailService
      .sendEmail(params)
      .catch(err => {
        // error sending email
        return res.status(401).json({ err })
      })
  })