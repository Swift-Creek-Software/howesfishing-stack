const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  email: String,
  isAdmin: Boolean,
  access: Array,
  deleted: Boolean,
  encryptedPassword: String,
  createdAt: Date,
  updatedAt: Date,
  guideId: String,
})

userSchema.set('toJSON', {
  virtuals: true
});


const User = mongoose.model('User', userSchema, 'user')
module.exports = User;