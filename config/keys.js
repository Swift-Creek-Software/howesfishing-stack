// keys.js decide which env we are in
if (process.env.NODE_ENV === 'production') {
  // use prod keys
  module.exports = require('./prod')
} else {
  // use dev keys
  module.exports = require('./dev')
  console.log('using dev keys')
}