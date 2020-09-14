const express = require("express");
const { Router } = express;
const Officers = require("./../model/officer.model");
const bcrypt = require("bcrypt");
const { PORT } = require('./../../config/default')
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { regForm, loginForm } = require("./../middleware/formValidation")(check);
const {
  officers,
  register,
  login,
} = require("./../controller/officer.Controller")(
  Officers,
  bcrypt,
  validationResult,
  jwt,
  PORT
);

const officerRouter = Router();

officerRouter.route("/").get(officers);
officerRouter.route("/register").post(register);
officerRouter.route("/login").post(login);
officerRouter.route("/logout").get();
officerRouter.route("/profile/:officerID").get();
officerRouter.route("/delete/:officerID").delete();

module.exports = officerRouter;
