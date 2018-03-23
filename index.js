const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express()
const keys = require('./config/keys')
require('./models/Email')
require('./models/Guide')
require('./models/User')
require('./models/Location')
require('./models/Trip')

mongoose.connect(keys.mongoURI, { useMongoClient: true })
mongoose.Promise = global.Promise;

app.use(require('./middleware/allowCrossDomain'))
app.use(bodyParser.json())


require('./routes/authRoutes')(app)
require('./routes/emailRoutes')(app)
require('./routes/guideRoutes')(app)
require('./routes/healthCheck')(app)
require('./routes/locationRoutes')(app)
require('./routes/textRoutes')(app)
require('./routes/tripRoutes')(app)
require('./routes/userRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)