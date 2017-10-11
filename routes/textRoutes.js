const twilio = require('twilio');
const keys = require('../config/keys')

const client = new twilio(keys.twilioAccountSid, keys.twilioAuthToken);
module.exports = (app) => {
app.get('/text', (req, res) => {
	console.log('hit the text route')


	client.messages.create({
		body: 'Hello from Node',
		to: '+14062708435',  // Text this number
		from:  keys.twilioFrom// From a valid Twilio number
	})
		.then((message) => {
		console.log(message.sid)
			res.send(message.sid)
		})
		.catch((e) => {
			console.log(e)
		});
})
}