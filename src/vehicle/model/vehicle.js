'use strict'

const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const ObjectId = mongoose.Schema.Types.ObjectId

const itemSchema = new mongoose.Schema({
    item: {
        type: ObjectId,
        ref: 'ItemEquip',
        autopopulate: true
    },
    quantity: Number
})

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
        },
        itemsEquips: [itemSchema]
    },
    {
        timestamps: true
    }
)

schema.statics.ApiPack = function() {
    return {
      pagination: {
        itemsPerPage: 10,
        clientEnabled: true,
      },
      filters: {
        search:{
            properties:{
                name: 'ipartial'
            }
        },
        order: {
            properties: {
                createdAt: 'asc',
            },
        }
      },
      
    };
  }; 

schema.plugin(autopopulate)

module.exports = mongoose.model('Vehicle', schema)