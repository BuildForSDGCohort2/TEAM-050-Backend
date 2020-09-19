const express = require('express')
const { Router } = express
const { offenses, offense} = require('./../controller/offense.Controller')

const offenseRouter = Router()

offenseRouter.route('/').get(offenses)
offenseRouter.route('/:id').get(offense)


module.exports = offenseRouter