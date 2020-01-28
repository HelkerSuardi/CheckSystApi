'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
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
        },
        type: {
            type: String,
            required: true,
            enum: ['vehicle', 'equipment']
        },
        status: {
            type: String,
            enum: ['OK', 'NOK']
        },
        observations: String,        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('ItemEquip', schema)