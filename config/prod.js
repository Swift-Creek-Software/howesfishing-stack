// prod keys
module.exports = {
  mongoURI: process.env.MONGO_URI,
  sparkpostId: process.env.SPARKPOST_ID,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioFrom: process.env.TWILIO_FROM,
};