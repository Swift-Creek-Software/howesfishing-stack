const mongoose = require('mongoose')
const { Schema } = mongoose

const emailSchema = new Schema({
  sparkpostResponse: Object,
  params: Object
})

const Email = mongoose.model('Email', emailSchema, 'email')

module.exports = Email;