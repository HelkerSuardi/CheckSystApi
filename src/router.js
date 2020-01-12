'use strict'

const router = require('express').Router()

const firefighter = require('./firefighter/router')
const check = require('./checks/router')
const vehicle = require('./vehicle/router')
const itemEquip = require('./item-equips/router')

router.use('/firefighters', firefighter)
router.use('/checks', check)
router.use('/vehicles', vehicle)
router.use('/items-equips', itemEquip)

module.exports = router