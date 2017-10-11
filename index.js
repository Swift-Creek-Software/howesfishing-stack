const express = require('express')
const bodyParser = require('body-parser');

const app = express()

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	}
	else {
		next();
	}
};

app.use(allowCrossDomain)
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send({hi: 'der'})
})

require('./routes/textRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)