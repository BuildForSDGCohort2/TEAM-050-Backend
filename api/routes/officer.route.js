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
const {
  officers,
  register,
  login,
  deltOfficer,
  profile,
  logout,
  update,
  offense,
} = require("./../controller/officer.Controller")(
  Officers,
  bcrypt,
  validationResult,
  jwt,
  mySecrete,
  Offenses,
  Citizens
);

const officerRouter = Router();

officerRouter.route("/").get(officers);
officerRouter.route("/register").post(register);
officerRouter.route("/login").post(login);
officerRouter.route("/logout").get(logout);
officerRouter.route("/edit/:officerID").patch(update);
officerRouter.route("/profile/:officerID").get(profile);
officerRouter.route("/delete/:officerID").delete(deltOfficer);
officerRouter.route("/offense/add").post(offense);

module.exports = officerRouter;
