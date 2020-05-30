'use strict'

const mongoose = require('mongoose')
const Firefighter = mongoose.model('Firefighter')
const authService = require('../service/auth-service')

const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Firefighter.findOne({
            email: email
        }).exec()

        if (!user || !user.checkPassword(password)) {
            return res.status(404).send({
                message: 'Usuário ou senha incorretos!'
            })
        }        

        const token = await authService.generateToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })

        return res.status(200).send({
            token,
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (e) {
        return res.status(500).send({
            message: e.toString()
        })
    }
}

module.exports = authenticate