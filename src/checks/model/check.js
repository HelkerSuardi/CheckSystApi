'use strict'

const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema(
    {
        firefighter: {
            type: ObjectId,
            ref: 'Firefighter',
            autopopulate: true,
            required: true
        },
        vehicle: {
            type: ObjectId,
            ref: 'Vehicle',
            autopopulate: true,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['OK', 'NOK']
        }
    },
    {
        timestamps: true
    }
)

schema.plugin(autopopulate)

module.exports = mongoose.model('Check', schema)