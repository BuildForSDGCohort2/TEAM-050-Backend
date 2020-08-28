const express = require("express");
const Citizens = require("./../model/citizen.model");
const {
  register,
  login,
  logout,
  profile,
  citizens,
} = require("./../controller/citizen.Controller")(Citizens);

const { Router } = express;

const citizenRouter = Router();

citizenRouter.route("/register").post(register);
citizenRouter.route("/login").post(login);
citizenRouter.route("/logout").post(logout);
citizenRouter.route("/").get(citizens);
citizenRouter.route("/profil/:id").get(profile);

module.exports = citizenRouter;
