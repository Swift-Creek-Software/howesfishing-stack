const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express()

app.use(require('./middleware/allowCrossDomain'))
app.use(bodyParser.json())


require('./routes/textRoutes')(app)
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)