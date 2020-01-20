'use strict'

const router = require('express').Router()

const authenticate = require('./action/authenticate')

router.post('/authenticate', authenticate)

module.exports = router