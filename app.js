const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const moment = require('moment-timezone');
const cors = require('cors');
const config = require('./config/config')

const app = express();

app.use(bodyparser.json())

let routes = require('./router');
const { messages } = require('./constants/messages');
app.use(cors())
app.use('/api/' + config.latestApiVersion, routes)
console.log('/api/' + config.latestApiVersion)

// Setting up logging
morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format(messages['datetime_format']);
})
morgan.format('myformat', '[:date[Asia/Karachi]] ":method :url" :status :res[content-length] - :response-time ms');
app.use(morgan('myformat'));
////////////////////

mongoose.connect(config.dbpath, { useNewUrlParser: true },
    (error) => {
        // console.log(error)
        console.log('Connection to database established!')
    })

var server = app.listen(config.port || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at localhost', host, port);
});