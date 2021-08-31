const EmailService = require('../services/EmailService')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const {startOfDay, endOfDay, format, addDays} = require('date-fns')
const {utcToZonedTime} = require('date-fns-tz')

require('../models/Trip')

const Trip = mongoose.model('Trip')

mongoose.connect(keys.mongoURI, { useMongoClient: true })
mongoose.Promise = global.Promise;

const day = addDays(utcToZonedTime(new Date(), 'America/Denver'), 3);

Trip.find({ deleted: false, sendClientEmail: true, endTime: {"$gte": startOfDay(day), "$lt": endOfDay(day)} })
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
        // {
        //   address: {
        //     "email": "reservations@howesfishing.com",
        //     "header_to": 'grossmail1@gmail.com'
        //   }
        // }
      ],
      templateId: 'client-follow-up',
      templateData: {
        trips,
        subject: `Fishing Trip Reminder ${format(day, 'MM/dd/yyyy')}`,
      },
      campaignId: 'Client confirmation',
    }

    return EmailService
      .sendEmail(params)
  })