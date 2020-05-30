'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

//Connect to DB
require('./db')

//Load Models
const Check = require('./src/checks/model/check')
const Firefighter = require('./src/firefighter/model/firefighter')
const ItemEquip = require('./src/item-equips/model/item-equips')
const Vehicle = require('./src/vehicle/model/vehicle')

const models = [
    Check,
    Firefighter,
    ItemEquip,
    Vehicle
]

//Configuring ApiPack
const {ApiPack} = require('@kolinalabs/api-pack-mongoose')
const RouterStack = require('@kolinalabs/api-pack-express')

//Initiate ApiPack + build routes
const apiPack = new ApiPack(models)
const routes = apiPack.routing(RouterStack)

const customRoutes = require('./src/router')

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '16mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }))
app.use('/api', customRoutes)
app.use('/api', (req, res, next) => {
    next()
    }, routes )

app.listen(process.env.PORT || 3002)