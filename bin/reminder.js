const EmailService = require('../services/EmailService')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const {startOfDay, endOfDay, format, addDays} = require('date-fns')
const {utcToZonedTime, zonedTimeToUtc} = require('date-fns-tz')

require('../models/Trip')

const Trip = mongoose.model('Trip')

mongoose.connect(keys.mongoURI)
mongoose.Promise = global.Promise;

const day = addDays(utcToZonedTime(new Date(), 'America/Denver'), 3);
const startDay = zonedTimeToUtc(startOfDay(day), 'America/Denver')
const endDay = zonedTimeToUtc(endOfDay(day), 'America/Denver')

Trip.find({ deleted: false, sendClientEmail: true, startTime: {"$gte": startDay, "$lt": endDay} })
  .sort({ endTime: 'asc'})
  .exec((err, trips) => {
    if (err) {
      return err
    }
    trips.forEach(trip => {
      const params = {
        recipients: [
          {
            address: trip.email,
          },
          {
            address: {
              'email': 'reservations@howesfishing.com',
              'header_to': trip.email,
            },
          },
        ],
        templateId: 'howes-fishing',
        templateData: {
          firstName: trip.firstName,
          confirm: 'remind',
          directions: trip.directions,
          from: trip.userName,
          subject: `Fishing Trip Reminder ${format(new Date(trip.startTime), 'MM/dd/yyyy')}`,
          timeCost: trip.clientEmailTemplate,
        },
        campaignId: 'Client reminder',
      }
      EmailService.sendEmail(params)
      // console.log('params',JSON.stringify(params))
    })
  })