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
    quantity: Number,
    status: {
        type: Boolean,
        default: null
    },
    motive: String,
    justify: String
})

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
            type: String,
            required: true
        },
        itemsEquips: [itemSchema],
        status: {
            type: String,
            enum: ['OK', 'NOK', 'NOTDONE'],
            default: 'NOTDONE'
        }
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
        }        
    };
};

schema.plugin(autopopulate)

schema.pre('save', function() {
    if(this.isNew) {
        return
    }
    
    if (this.itemsEquips.length > 0) {
        const isAnyIncomplete = this.itemsEquips.some(item => { return item.status === false })
        const isAnyNull = this.itemsEquips.some(item => { return item.status === null })
        
        if (isAnyIncomplete) {
            this.status = 'NOK'
        } else if (isAnyNull) {
            this.status = 'NOTDONE'
        } else {
            this.status = 'OK'
        }
        
    }
})

module.exports = mongoose.model('Check', schema)