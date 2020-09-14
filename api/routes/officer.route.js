const express = require('express')
const { Router } = express;
const Officer = require('./../model/officer.model')
const bcrypt = require('bcrypt')
const { mySecrete } = require('./../../config/default')
const jwt = require('jsonwebtoken')
const { va } = require('./../middleware/formValidation')
const {} = require('./../controller/officer.Controller')(Officer, bcrypt)



const officerRouter = Router()

officerRouter.route('/').get()
officerRouter.route('/register').post()
officerRouter.route('/login').post()
officerRouter.route('/logout').get()
officerRouter.route('/profile').get()