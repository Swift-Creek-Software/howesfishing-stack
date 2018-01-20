const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  email: String,
  isAdmin: Boolean,
  access: Array,
  deleted: Boolean,
  encryptedPasswored: String,
  createdAt: Date,
  updatedAt: Date
})

mongoose.model('User', userSchema, 'user')