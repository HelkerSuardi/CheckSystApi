'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        plaque: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Vehicle', schema)