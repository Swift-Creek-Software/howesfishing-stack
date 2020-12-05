const mongoose = require('mongoose')
const { Schema } = mongoose

const locationSchema = new Schema({
  name: String,
  directions: String,
  createdAt: Date,
  updatedAt: Date,
})

locationSchema.set('toJSON', {
  virtuals: true
});


const Location = mongoose.model('Location', locationSchema, 'location')
module.exports = Location;