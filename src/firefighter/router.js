'use strict'

const router = require('express').Router()

const resetPassword = require('./action/reset-password')

router.put('/reset-password/:email', resetPassword)

module.exports = router