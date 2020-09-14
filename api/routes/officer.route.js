const express = require('express')
const { Router } = express;
const Officers = require('./../model/officer.model')
const bcrypt = require('bcrypt')
const { mySecrete } = require('./../../config/default')
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");
const {} = require('./../controller/officer.Controller')(Officers, bcrypt, validationResult, jwt)



const officerRouter = Router()

officerRouter.route('/').get()
officerRouter.route('/register').post()
officerRouter.route('/login').post()
officerRouter.route('/logout').get()
officerRouter.route('/profile/:officerID').get()
officerRouter.route('/delete/:officerID').delete()