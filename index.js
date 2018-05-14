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
require('./services/cron')()

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


if (process.env.NODE_ENV === 'production') {
  // make sure express serves up prod assets
  app.use(express.static('client/build'))

  // serve up the index.html
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)