'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        rg: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['superAdm', 'adm', 'operator'],
            required: true
        },
    },
    {
        timestamps: true
    }
)

schema.methods.checkPassword = function (password){
    return bcrypt.compareSync(password, this.password)
}

schema.methods.hashPassword = function () {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(this.password, salt)
    this.password = hashedPassword
}

schema.pre('save', function () {
    if (this.isModified('password')) {
        this.hashPassword()
    }
})

module.exports = mongoose.model('Firefighter', schema)