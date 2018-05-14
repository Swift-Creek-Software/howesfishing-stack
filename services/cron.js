var cron = require('cron');
const mongoose = require('mongoose')
const Trip = mongoose.model('Trip')

module.exports = () => {
  new cron.CronJob(
    '0 14 * * * *',
    () => {
      const threeDays = (3 * 24 * 60 * 60 * 1000)
      const startDate = new Date(new Date(new Date().getTime() + threeDays).setHours(0,0,0,0))
      const endDate = new Date(new Date(startDate).setHours(23,59,59,999))

      Trip.find({ startTime: { "$gte": startDate, "$lt": endDate }, deleted: false })
        .then(trips => {

          trips.forEach(trip => {
            console.log('trip: ', trip, trip._id)
            // Trip.findOneAndUpdate({_id: trip._id}, {confirmationSent: true}, (err) => {
            //   console.log('error with save', err)
            // })
            Trip.find({_id: trip._id}).then(()= , (err, trips) => {
             console.log('trips', trips)
             console.log('error', err)
            })
          })
        })
        .catch(err => {
          console.error(`++ Error in cron sendReminderEmail`,JSON.stringify(err))
        })
    },
    null,
    true,
    'America/Denver'
  )
}