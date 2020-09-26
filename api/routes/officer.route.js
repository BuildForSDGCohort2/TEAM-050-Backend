const mongoose = require("mongoose");
const express = require("express");
const { Router } = express;
const Officers = require("./../model/officer.model");
const Offenses = require("./../model/offense.model");
const Citizens = require("./../model/citizen.model");
const bcrypt = require("bcrypt");
const { mySecrete } = require("./../../config/default");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { regForm, loginForm } = require("./../middleware/formValidation")(check);
const auth = require('./../middleware/auth')
const {
  officers,
  register,
  login,
  deltOfficer,
  profile,
  logout,
  update,
  offense,
  resetPassword
} = require("./../controller/officer.Controller")(
  Officers,
  bcrypt,
  validationResult,
  jwt,
  mySecrete,
  Offenses,
  Citizens,
  mongoose
);

const officerRouter = Router();

officerRouter.route("/").get(officers);
officerRouter.route("/register").post(regForm ,register);
officerRouter.route("/login").post(loginForm ,login);
officerRouter.route("/logout").get(auth, logout);
officerRouter.route("/edit/:officerID").patch(auth, update);
officerRouter.route("/profile/:officerID").get(auth, profile);
officerRouter.route("/delete/:officerID").delete(auth, deltOfficer);
officerRouter.route('/resetPassword/:officerID').patch(resetPassword)
officerRouter.route("/offense/add").post(auth, offense);

module.exports = officerRouter;
