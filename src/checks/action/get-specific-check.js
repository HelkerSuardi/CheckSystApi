'use strict'

const Check = require('../model/check')
const moment = require('moment')

const getSpecificCheck = async (req, res) => {
    const { userId } = req.params
    const startOfDay = moment().startOf('day')
    const endOfDay = moment().endOf('day')

    const check = await Check.find({
        firefighter: userId,
        date: { $gte: startOfDay, $lte: endOfDay }
    })

    res.send(check)

}

module.exports = getSpecificCheck