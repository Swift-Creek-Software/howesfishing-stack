const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express()
const keys = require('./config/keys')
require('./models/Email')
require('./models/Guide')
require('./models/User')

mongoose.connect(keys.mongoURI, { useMongoClient: true })
mongoose.Promise = global.Promise;

app.use(require('./middleware/allowCrossDomain'))
app.use(bodyParser.json())


require('./routes/textRoutes')(app)
require('./routes/authRoutes')(app)
require('./routes/guideRoutes')(app)
require('./routes/healthCheck')(app)
require('./routes/emailRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)