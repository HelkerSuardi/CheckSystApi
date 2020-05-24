'use strict'

const router = require('express').Router()

const getSpecificCheck = require('./action/get-specific-check')

router.get('/specific-check/:userId', getSpecificCheck)

module.exports = router