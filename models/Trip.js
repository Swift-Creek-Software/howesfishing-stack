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
  cost: String,
  location: String,
  guides: Array,
  clientEmailTemple: String,
  notes: String,
  directions: String,
  userName: String,
  createdAt: Date,
  updatedAt: Date,
})

tripSchema.set('toJSON', {
  virtuals: true
});

mongoose.model('Trip', tripSchema, 'trip')