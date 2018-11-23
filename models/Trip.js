const mongoose = require('mongoose')
const { Schema } = mongoose

const tripSchema = new Schema({
  sendClientEmail: Boolean,
  startTime: Date,
  endTime: Date,
  deleted: Boolean,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  guests: String,
  kidsUnder12: String,
  cost: String,
  location: String,
  guides: Array,
  clientEmailTemplate: String,
  notes: String,
  directions: String,
  userName: String,
  hearAbout: String,
  staying: String,
  createdAt: Date,
  updatedAt: Date,
})

tripSchema.set('toJSON', {
  virtuals: true
});

mongoose.model('Trip', tripSchema, 'trip')