'use strict'

const mongoose = require('mongoose')
const DSN = require('./dsn')
const OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

mongoose.connect(DSN, OPTIONS)
    .then (() => {
        console.log('DB CONNECTED')
    })
    .catch (error => {
        console.log(error)
    })