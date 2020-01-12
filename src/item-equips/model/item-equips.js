'use strict'

const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema(
    {
        vehicle: {
            type: ObjectId,
            ref: 'Vehicle',
            autopopulate: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        measure: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['vehicle', 'equipment']
        },
        status: {
            type: String,
            required: true,
            enum: ['OK', 'NOK']
        },
        observations: String,        
    },
    {
        timestamps: true
    }
)

schema.plugin(autopopulate)

module.exports = mongoose.model('ItemEquip', schema)