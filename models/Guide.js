const mongoose = require('mongoose')
const { Schema } = mongoose

const guideSchema = new Schema({
  name: String,
  emails: Array,
  phones: Array,
  deleted: Boolean,
  color: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date,
})

guideSchema.set('toJSON', {
  virtuals: true
});

mongoose.model('Guide', guideSchema, 'guide')