const express = require("express");
const Citizens = require("./../model/citizen.model");
const { images } = require("./../util/profileImage");
const { mySecrete } = require("./../../config/default");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./../middleware/auth");
const { body, validationResult } = require("express-validator");
const { regForm, loginForm } = require("./../middleware/formValidation")(body);
const {
  register,
  login,
  logout,
  profile,
  citizens,
  deltCitizen,
  update,
  resetPassword,
} = require("./../controller/citizen.Controller")(
  Citizens,
  bcrypt,
  mySecrete,
  jwt,
  validationResult
);

const { Router } = express;

const citizenRouter = Router();

citizenRouter.route("/register").post(images, register);
citizenRouter.route("/login").post(loginForm, login);
citizenRouter.route("/logout").post(logout);
citizenRouter.route("/password/reset").patch(resetPassword);
citizenRouter.route("/").get(citizens);
citizenRouter.route("/profile/:id").get(auth, profile);
citizenRouter.route("/edit/:id").patch(update);
citizenRouter.route("/delete/:id").delete(deltCitizen);

module.exports = citizenRouter;
