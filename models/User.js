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
})

userSchema.set('toJSON', {
  virtuals: true
});


mongoose.model('User', userSchema, 'user')