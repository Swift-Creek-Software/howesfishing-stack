const mongoose = require('mongoose')
const { Schema } = mongoose

const emailSchema = new Schema({
  sparkpostResponse: Object,
  params: Object
})

mongoose.model('Email', emailSchema, 'email')