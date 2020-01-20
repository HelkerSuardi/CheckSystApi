'use strict'

const router = require('express').Router()
const authService = require('./auth/service/auth-service')

const auth = require('./auth/router')
const firefighter = require('./firefighter/router')
const check = require('./checks/router')
const vehicle = require('./vehicle/router')
const itemEquip = require('./item-equips/router')

router.use('/firefighters', firefighter)
router.use('/checks', check)
router.use('/vehicles', vehicle)
router.use('/item-equips', itemEquip)
router.use('/auth', auth)

module.exports = router