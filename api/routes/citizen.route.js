const express = require("express");
const Citizens = require("./../model/citizen.model");
const { mySecrete } = require('./../../config/default')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator')
const {regForm, loginForm} = require('./../middleware/formValidation')(body)
const {
  register,
  login,
  logout,
  profile,
  citizens,
  deltCitizen,
} = require("./../controller/citizen.Controller")(Citizens, bcrypt, mySecrete, jwt, validationResult);

const { Router } = express;

const citizenRouter = Router();

citizenRouter.route("/register").post(register);
citizenRouter.route("/login").post(loginForm, login);
citizenRouter.route("/logout").post(logout);
citizenRouter.route("/").get(citizens);
citizenRouter.route("/profile/:id").get(profile);
citizenRouter.route("/delete/:id").delete(deltCitizen);

module.exports = citizenRouter;
